'use client'

import { createClient } from '@/lib/supabase/client'
import Logo from '@/components/Logo'
import { Mail, ArrowRight, CheckCircle, Loader2, Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-slate-500 mt-2 text-sm">
            Sign in to build your professional resume
          </p>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-100 p-8">
          {sent ? (
            /* ── Sent state ── */
            <div className="text-center py-2">
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
              <h2 className="font-bold text-slate-900 text-xl mb-2">Check your email</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">
                We sent a magic login link to{' '}
                <span className="font-semibold text-slate-700">{email}</span>.
                Click the link to sign in — it expires in 1 hour.
              </p>
              <p className="text-xs text-slate-400">
                Didn&apos;t get it? Check your spam folder, or{' '}
                <button
                  onClick={() => setSent(false)}
                  className="text-brand-600 font-semibold hover:underline"
                >
                  try again
                </button>
                .
              </p>
            </div>
          ) : (
            /* ── Form state ── */
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Your email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    className="input-field pl-10"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
                  <span className="shrink-0 mt-px">⚠</span>
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn-primary w-full py-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending link...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Send Magic Link
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-400 leading-relaxed">
                No password needed — we&apos;ll email you a secure one-time login link.
              </p>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          ₦1,000 per resume &middot; No subscription needed
        </p>
      </div>
    </div>
  )
}
