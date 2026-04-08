import Link from 'next/link'
import Logo from '@/components/Logo'
import SampleResumeSection from '@/components/SampleResumeSection'
import {
  Zap,
  Download,
  Mail,
  CheckCircle,
  ArrowRight,
  Shield,
  Clock,
  Sparkles,
  FileText,
} from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Writing',
    description:
      'Llama 3.3 70B analyzes your experience and the job description to craft a perfectly tailored resume.',
  },
  {
    icon: FileText,
    title: 'Professional PDF',
    description:
      'Choose from 3 polished templates — Modern, Classic, or Executive — each ATS-ready and formatted by design.',
  },
  {
    icon: Mail,
    title: 'Delivered to Your Inbox',
    description:
      'Your resume is automatically emailed so you always have a copy, even on mobile.',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description:
      'Pay securely with Paystack. Your card details are never stored on our servers.',
  },
]

const steps = [
  {
    step: '01',
    title: 'Fill in your details',
    description:
      'Enter your work experience, education, skills, and paste the job description you are targeting.',
  },
  {
    step: '02',
    title: 'Choose a template & pay ₦1,000',
    description:
      'Pick from 3 professional templates, then complete a one-time secure payment — no subscriptions.',
  },
  {
    step: '03',
    title: 'Download your resume',
    description:
      'Receive a polished, professional PDF in seconds — tailored for your target role and sent to your inbox.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/login"
              className="btn-primary text-sm px-5 py-2.5"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#eef2ff_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#f0fdf4_0%,_transparent_60%)]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-8 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            AI-powered — ₦1,000 per resume
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold text-slate-900 leading-[1.08] tracking-tight mb-7">
            Land Your Dream Job
            <br />
            <span className="bg-gradient-to-r from-brand-600 to-violet-500 bg-clip-text text-transparent">
              with AI-Written
            </span>
            <br />
            Resumes
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-slate-500 leading-relaxed mb-10">
            Paste your experience and the job description. Get a professionally
            written, ATS-optimized resume PDF — tailored specifically to the role
            — delivered to your inbox in under 60 seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="btn-primary text-base px-8 py-4 shadow-lg shadow-brand-100">
              Build My Resume
              <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              No subscription · No hidden fees
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-xl mx-auto">
            {[
              { value: '< 60s', label: 'Generation time' },
              { value: '3', label: 'PDF templates' },
              { value: '₦1k', label: 'Flat price, no sub' },
            ].map((stat) => (
              <div key={stat.label} className="bg-slate-50 border border-slate-100 rounded-2xl py-4 px-3">
                <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything you need to get hired
            </h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              From AI writing to PDF delivery — the complete pipeline, one payment.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-brand-50 border border-brand-100 rounded-xl flex items-center justify-center mb-5">
                  <f.icon className="w-5 h-5 text-brand-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 text-[15px]">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">How it works</h2>
            <p className="text-lg text-slate-500">Three steps. Under 5 minutes.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 relative">
            {/* connector lines */}
            <div className="hidden sm:block absolute top-10 left-[33%] right-[33%] h-px bg-gradient-to-r from-brand-200 to-brand-200" />
            {steps.map((s, i) => (
              <div key={s.step} className="relative text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-500 to-violet-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-extrabold shadow-lg shadow-brand-100">
                  {s.step}
                </div>
                <h3 className="font-semibold text-slate-900 text-lg mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sample Resume ───────────────────────────────────────────── */}
      <SampleResumeSection />

      {/* ── Pricing ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-lg mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Simple, honest pricing
          </h2>
          <p className="text-slate-500 mb-12">Pay only when you need a resume. No recurring charges.</p>

          <div className="bg-white border-2 border-brand-200 rounded-3xl p-8 shadow-xl shadow-brand-50 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-gradient-to-r from-brand-600 to-violet-500 text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-wide uppercase shadow">
                One-Time Payment
              </span>
            </div>

            <div className="flex items-end justify-center gap-1 mt-2 mb-1">
              <span className="text-3xl font-bold text-slate-400 mb-2">₦</span>
              <span className="text-8xl font-extrabold text-slate-900 leading-none tracking-tighter">
                1,000
              </span>
            </div>
            <p className="text-slate-400 mb-8 text-sm">per resume · pay as you go</p>

            <ul className="text-left space-y-3.5 mb-9">
              {[
                'AI-tailored to the exact job description',
                '3 professional PDF templates to choose from',
                'Delivered straight to your email',
                'ATS-optimized formatting',
                'No monthly fees, ever',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="w-5 h-5 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/login" className="btn-primary w-full text-base py-4 shadow-lg shadow-brand-100">
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-brand-600 to-violet-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_white_0%,_transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to get the interview?
          </h2>
          <p className="text-brand-200 text-lg mb-10">
            Join professionals using Zeender to land their dream roles.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-600 font-bold rounded-2xl hover:bg-brand-50 transition-colors shadow-xl text-base"
          >
            Build My Resume Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="py-10 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size="sm" inverted />
          <p className="text-slate-400 text-sm flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Resumes delivered in under 60 seconds
          </p>
          <p className="text-slate-600 text-xs">© 2025 Zeender. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
