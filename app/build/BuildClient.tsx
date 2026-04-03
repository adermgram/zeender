'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Download, ArrowLeft, CheckCircle, Mail, AlertCircle } from 'lucide-react'

import Logo from '@/components/Logo'
import StepIndicator from '@/components/StepIndicator'
import PersonalInfo from '@/components/resume-form/PersonalInfo'
import WorkExperienceStep from '@/components/resume-form/WorkExperience'
import EducationSkills from '@/components/resume-form/EducationSkills'
import TargetJob from '@/components/resume-form/TargetJob'
import PaymentModal from '@/components/PaymentModal'
import { ResumeFormData } from '@/types'

const STEPS = [
  { number: 1, title: 'Personal Info' },
  { number: 2, title: 'Experience' },
  { number: 3, title: 'Education' },
  { number: 4, title: 'Target Job' },
]

const defaultFormData: ResumeFormData = {
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  location: '',
  experience: [{ company: '', role: '', duration: '', description: '' }],
  education: [{ school: '', degree: '', year: '' }],
  skills: '',
  targetJobDescription: '',
  template: 'modern',
}

export default function BuildClient({
  userEmail,
  existingPaymentId,
}: {
  userEmail: string
  existingPaymentId?: string
}) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<ResumeFormData>(defaultFormData)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [result, setResult] = useState<{ resumeId: string; pdfUrl: string } | null>(null)

  function updateForm(data: Partial<ResumeFormData>) {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  function handleSuccess(resumeId: string, pdfUrl: string) {
    setShowPaymentModal(false)
    setResult({ resumeId, pdfUrl })
  }

  if (result) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="card p-10">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Your Resume is Ready! 🎉
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Your AI-generated resume PDF has been created and sent to{' '}
              <span className="font-medium text-slate-700">{userEmail}</span>.
              Check your inbox (and spam folder).
            </p>
            <div className="space-y-3">
              <a
                href={result.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
              <button
                onClick={() => {
                  setResult(null)
                  setStep(1)
                  setFormData(defaultFormData)
                }}
                className="btn-secondary w-full"
              >
                Build Another Resume
              </button>
              <Link href="/dashboard" className="block text-sm text-slate-400 hover:text-slate-600 transition-colors mt-2">
                Go to Dashboard →
              </Link>
            </div>
            <div className="mt-6 p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-2">
              <Mail className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700">
                Not in your inbox? Check your spam folder or download directly above.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <Logo size="sm" />
          <div className="ml-auto text-xs text-slate-400 font-medium">
            Step {step} of {STEPS.length}
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="card p-6 sm:p-8">
          <StepIndicator steps={STEPS} currentStep={step} />

          {step === 1 && (
            <PersonalInfo
              data={formData}
              onChange={updateForm}
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <WorkExperienceStep
              data={formData}
              onChange={updateForm}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <EducationSkills
              data={formData}
              onChange={updateForm}
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          )}

          {step === 4 && (
            <>
              {existingPaymentId && (
                <div className="mb-5 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    <span className="font-semibold">No payment needed.</span> Your previous payment of ₦1,000 is being applied to this resume.
                  </p>
                </div>
              )}
              <TargetJob
                data={formData}
                onChange={updateForm}
                onSubmit={() => setShowPaymentModal(true)}
                onBack={() => setStep(3)}
              />
            </>
          )}
        </div>
      </main>

      {showPaymentModal && (
        <PaymentModal
          userEmail={userEmail}
          formData={formData}
          existingPaymentId={existingPaymentId}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  )
}
