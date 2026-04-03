'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'
import { X, CreditCard, Loader2, CheckCircle, AlertCircle, Sparkles } from 'lucide-react'
import { ResumeFormData } from '@/types'

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: Record<string, unknown>) => { openIframe: () => void }
    }
  }
}

type Stage =
  | 'idle'
  | 'initializing'
  | 'payment'
  | 'verifying'
  | 'generating'
  | 'pdf'
  | 'success'
  | 'error'

interface PaymentModalProps {
  userEmail: string
  formData: ResumeFormData
  existingPaymentId?: string
  onClose: () => void
  onSuccess: (resumeId: string, pdfUrl: string) => void
}

export default function PaymentModal({
  userEmail,
  formData,
  existingPaymentId,
  onClose,
  onSuccess,
}: PaymentModalProps) {
  const [stage, setStage] = useState<Stage>('idle')
  const [error, setError] = useState('')
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    // If there's an existing verified payment, skip straight to generation
    if (existingPaymentId) {
      handleGenerate(existingPaymentId)
      return
    }
    if (scriptLoaded && stage === 'idle') {
      startPayment()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptLoaded, existingPaymentId])

  async function startPayment() {
    setStage('initializing')
    setError('')

    try {
      // Step 1: Create pending payment record server-side.
      // A 401 here means the session expired — surface a clear message.
      const initRes = await fetch('/api/payment/initialize', { method: 'POST' })
      if (initRes.status === 401) {
        throw new Error('Your session has expired. Please refresh the page and sign in again before paying.')
      }
      if (!initRes.ok) throw new Error('Failed to initialize payment')
      const { reference, amount } = await initRes.json()

      setStage('payment')

      // Step 2: Open Paystack popup.
      // PATTERN: callback fires right after payment succeeds (primary path).
      // onClose fires when popup is dismissed — if callback already ran we
      // ignore it; if it didn't, the user cancelled.
      let paymentHandled = false

      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: userEmail,
        amount,
        ref: reference,
        currency: 'NGN',
        label: 'Resume Generation — ₦1,000',
        callback: function (transaction: { reference: string }) {
          paymentHandled = true
          handlePopupClosed(transaction.reference)
        },
        onClose: function () {
          if (!paymentHandled) {
            // Popup closed without a successful payment — user cancelled
            setStage('idle')
            setError('Payment was not completed. Click below to try again.')
          }
        },
      })
      handler.openIframe()
    } catch (err: unknown) {
      setStage('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  async function handlePopupClosed(reference: string) {
    setStage('verifying')
    try {
      const verifyRes = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference }),
      })
      if (!verifyRes.ok) {
        const data = await verifyRes.json()
        setStage('idle')
        setError(
          data.error === 'Payment was not successful'
            ? 'Payment was not completed. Click below to try again.'
            : data.error || 'Payment verification failed.'
        )
        return
      }
      const { paymentId } = await verifyRes.json()
      await handleGenerate(paymentId)
    } catch (err: unknown) {
      setStage('error')
      setError(err instanceof Error ? err.message : 'Something went wrong after payment.')
    }
  }

  async function handleGenerate(paymentId: string) {
    try {
      // Generate resume via Groq
      setStage('generating')
      const generateRes = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, paymentId }),
      })
      if (!generateRes.ok) {
        const { error } = await generateRes.json()
        throw new Error(error || 'Resume generation failed')
      }
      const { resumeId } = await generateRes.json()

      // Generate PDF
      setStage('pdf')
      const pdfRes = await fetch('/api/resume/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId }),
      })
      if (!pdfRes.ok) {
        const { error } = await pdfRes.json()
        throw new Error(error || 'PDF generation failed')
      }
      const { pdfUrl } = await pdfRes.json()

      setStage('success')
      onSuccess(resumeId, pdfUrl)
    } catch (err: unknown) {
      setStage('error')
      setError(err instanceof Error ? err.message : 'Something went wrong generating your resume.')
    }
  }

  const stageLabel: Record<Stage, string> = {
    idle: 'Getting ready...',
    initializing: 'Preparing secure payment...',
    payment: 'Complete payment in the Paystack window',
    verifying: 'Verifying your payment...',
    generating: 'AI is writing your resume... (15–30s)',
    pdf: 'Generating your PDF...',
    success: 'Done!',
    error: 'Something went wrong',
  }

  const isProcessing = ['initializing', 'verifying', 'generating', 'pdf'].includes(stage)

  return (
    <>
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />

      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={isProcessing ? undefined : onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-7 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close — only when safe */}
          {!isProcessing && stage !== 'payment' && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {stage === 'success' ? (
            <div className="text-center py-2">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Your resume is ready! 🎉</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                A professional PDF has been generated and sent to{' '}
                <span className="font-medium text-slate-700">{userEmail}</span>.
              </p>
            </div>

          ) : stage === 'error' ? (
            <div className="text-center py-2">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Oops, something went wrong</h3>
              <p className="text-slate-500 text-sm mb-5">{error}</p>
              <button onClick={startPayment} className="btn-primary w-full">Try Again</button>
            </div>

          ) : stage === 'idle' && error ? (
            /* Cancelled state — show retry */
            <div className="text-center py-2">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Payment not completed</h3>
              <p className="text-slate-500 text-sm mb-5">{error}</p>
              <button onClick={startPayment} className="btn-primary w-full">Try Again</button>
            </div>

          ) : (
            <div className="text-center py-2">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {stage === 'payment' || stage === 'initializing' ? (
                  <CreditCard className="w-8 h-8 text-brand-600" />
                ) : (
                  <Sparkles className="w-8 h-8 text-brand-600" />
                )}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {stage === 'payment' ? 'Complete Payment' : 'Processing...'}
              </h3>
              <p className="text-slate-500 text-sm mb-5">{stageLabel[stage]}</p>

              {/* Progress steps */}
              <div className="space-y-2 text-left mb-4">
                {([
                  { stages: ['verifying', 'generating', 'pdf', 'success'], label: 'Secure payment — ₦1,000' },
                  { stages: ['generating', 'pdf', 'success'],              label: 'Payment verified' },
                  { stages: ['pdf', 'success'],                            label: 'AI writing your resume' },
                  { stages: ['success'],                                   label: 'Generating PDF' },
                ] as { stages: Stage[]; label: string }[]).map((item, i) => {
                  const isDone = item.stages.includes(stage)
                  const isActive = (
                    (i === 0 && ['initializing', 'payment'].includes(stage)) ||
                    (i === 1 && stage === 'verifying') ||
                    (i === 2 && stage === 'generating') ||
                    (i === 3 && stage === 'pdf')
                  )
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isDone ? 'bg-emerald-500' : isActive ? 'bg-brand-500 animate-pulse' : 'bg-slate-200'
                      }`}>
                        {isDone && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                        {isActive && !isDone && <Loader2 className="w-3 h-3 text-white animate-spin" />}
                      </div>
                      <span className={`text-sm ${isDone ? 'text-emerald-700 font-medium' : isActive ? 'text-brand-700 font-medium' : 'text-slate-400'}`}>
                        {item.label}
                      </span>
                    </div>
                  )
                })}
              </div>

              {isProcessing && (
                <p className="text-xs text-slate-400">Please don&apos;t close this window</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
