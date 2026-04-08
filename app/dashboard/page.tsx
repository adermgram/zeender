import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'
import {
  FileText,
  Plus,
  Download,
  Clock,
  CheckCircle,
  LogOut,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

async function signOut() {
  'use server'
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export default async function DashboardPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const [{ data: resumes }, { data: profile }, { data: allPayments }] =
    await Promise.all([
      supabase
        .from('resumes')
        .select('*, payments(status, created_at, amount)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', user.id)
        .single(),
      supabase
        .from('payments')
        .select('id, created_at')
        .eq('user_id', user.id)
        .eq('status', 'success'),
    ])

  // Find payments that have no resume attached — these are "unspent"
  const usedPaymentIdsFromResume = new Set(
    (resumes ?? []).map((r: any) => r.payment_id).filter(Boolean)
  )
  const unusedPayments = (allPayments ?? []).filter(
    (p) => !usedPaymentIdsFromResume.has(p.id)
  )

  const displayName =
    profile?.full_name || user.email?.split('@')[0] || 'there'
  const initial = displayName[0].toUpperCase()

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo size="md" />

          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="flex items-center gap-2.5">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={displayName}
                  className="w-8 h-8 rounded-full ring-2 ring-slate-100"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-gold-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {initial}
                </div>
              )}
              <span className="text-sm font-medium text-slate-700 hidden sm:block">
                {displayName}
              </span>
            </div>

            <div className="w-px h-5 bg-slate-200" />

            <form action={signOut}>
              <button
                type="submit"
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:block">Sign out</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* ── Unused payment banner ──────────────────────────────── */}
        {unusedPayments.length > 0 && (
          <div className="mb-8 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-amber-900 text-sm">
                  You have {unusedPayments.length} unused payment{unusedPayments.length > 1 ? 's' : ''}
                </p>
                <p className="text-amber-700 text-xs mt-0.5 leading-relaxed">
                  You paid but didn&apos;t finish generating your CV. No need to pay again — pick up right where you left off.
                </p>
              </div>
            </div>
            <Link
              href={`/build?paymentId=${unusedPayments[0].id}`}
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 text-white text-sm font-semibold rounded-xl hover:bg-amber-700 transition-colors"
            >
              Continue Building
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* ── Welcome + CTA ──────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Hey, {displayName} 👋
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              {resumes && resumes.length > 0
                ? `You have ${resumes.length} CV${resumes.length > 1 ? 's' : ''} ready to use.`
                : "You haven't built a CV yet. Let's fix that."}
            </p>
          </div>
          <Link href="/build" className="btn-primary shrink-0">
            <Plus className="w-4 h-4" />
            Build New CV
          </Link>
        </div>

        {/* ── Stats ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm">
            <p className="text-3xl font-extrabold text-slate-900">{resumes?.length ?? 0}</p>
            <p className="text-xs text-slate-500 mt-1 font-medium uppercase tracking-wide">CVs</p>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm">
            <p className="text-3xl font-extrabold text-emerald-500">
              {resumes?.filter((r: any) => r.pdf_url).length ?? 0}
            </p>
            <p className="text-xs text-slate-500 mt-1 font-medium uppercase tracking-wide">PDFs Ready</p>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm">
            <p className="text-3xl font-extrabold text-brand-600">
              GH₵{((resumes?.length ?? 0) * 10).toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-1 font-medium uppercase tracking-wide">Invested</p>
          </div>
        </div>

        {/* ── Resume list ────────────────────────────────────────── */}
        {!resumes || resumes.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center shadow-sm">
            <div className="w-20 h-20 bg-brand-50 border border-brand-100 rounded-3xl flex items-center justify-center mx-auto mb-5">
              <Sparkles className="w-9 h-9 text-brand-400" />
            </div>
            <h3 className="font-bold text-slate-900 text-xl mb-2">No CVs yet</h3>
            <p className="text-slate-400 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
              Build your first AI-powered CV and get it delivered to your inbox in minutes.
            </p>
            <Link href="/build" className="btn-primary">
              <Plus className="w-4 h-4" />
              Build Your First CV
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {resumes.map((resume: any) => {
              const content = resume.content as {
                experience?: { role: string; company: string }[]
                _personal?: { fullName: string; jobTitle: string }
              }
              const title = content?._personal?.jobTitle || content?.experience?.[0]?.role || 'Professional CV'
              const name = content?._personal?.fullName || content?.experience?.[0]?.company || ''
              const date = new Date(resume.created_at).toLocaleDateString('en-GH', {
                day: 'numeric', month: 'short', year: 'numeric',
              })

              return (
                <div key={resume.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-11 h-11 bg-gradient-to-br from-brand-50 to-gold-50 border border-brand-100 rounded-xl flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-brand-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 truncate text-[15px]">{title}</p>
                      {name && <p className="text-sm text-slate-400 truncate mt-0.5">{name}</p>}
                    </div>
                    {resume.pdf_url && (
                      <a
                        href={resume.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 p-2 bg-brand-50 text-brand-600 rounded-xl hover:bg-brand-100 transition-colors"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {date}
                    </span>
                    <span className={`flex items-center gap-1.5 font-semibold ${resume.pdf_url ? 'text-emerald-500' : 'text-slate-400'}`}>
                      <CheckCircle className="w-3.5 h-3.5" />
                      {resume.pdf_url ? 'PDF Ready' : 'Generated'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
