'use client'

import { ResumeFormData } from '@/types'
import { Target, CheckCircle, Sparkles } from 'lucide-react'
import TemplateSelector from '@/components/TemplateSelector'

interface TargetJobProps {
  data: ResumeFormData
  onChange: (data: Partial<ResumeFormData>) => void
  onSubmit: () => void
  onBack: () => void
  isSubmitting?: boolean
}

export default function TargetJob({
  data,
  onChange,
  onSubmit,
  onBack,
  isSubmitting,
}: TargetJobProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">Target Job Description</h2>
        <p className="text-slate-500 text-sm">
          Paste the exact job description you are applying for. Our AI uses it to tailor your
          resume — the more detail, the better.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 flex gap-3">
        <Target className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
        <div>
          <p className="font-medium mb-0.5">Pro tip</p>
          <p className="text-amber-700">
            Copy the full job description including requirements, responsibilities, and preferred
            qualifications. The AI will mirror the job&apos;s language to pass ATS filters.
          </p>
        </div>
      </div>

      <div>
        <label className="label">
          <span className="flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-slate-400" /> Job Description *
          </span>
        </label>
        <textarea
          className="input-field resize-none"
          rows={10}
          placeholder="Paste the full job description here...

Example:
We are looking for a Senior Software Engineer to join our team. The ideal candidate will have 3+ years of experience with Python, REST APIs, and cloud infrastructure. You will be responsible for building scalable microservices, collaborating with cross-functional teams, and mentoring junior engineers..."
          value={data.targetJobDescription}
          onChange={(e) => onChange({ targetJobDescription: e.target.value })}
          required
          minLength={50}
        />
        <p className="text-xs text-slate-400 mt-1.5">
          {data.targetJobDescription.length} characters
          {data.targetJobDescription.length < 50 && data.targetJobDescription.length > 0 && (
            <span className="text-amber-500"> — add more detail for better results</span>
          )}
        </p>
      </div>

      <TemplateSelector
        selected={data.template}
        onChange={(id) => onChange({ template: id })}
      />

      {/* Summary */}
      <div className="bg-brand-50 border border-brand-100 rounded-xl p-4">
        <p className="text-sm font-semibold text-brand-800 mb-3 flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4" /> Form Summary
        </p>
        <ul className="space-y-1.5 text-sm text-brand-700">
          <li>✓ {data.fullName} — {data.jobTitle}</li>
          <li>✓ {data.experience.filter((e) => e.company).length} work experience{data.experience.filter((e) => e.company).length !== 1 ? 's' : ''}</li>
          <li>✓ {data.education.filter((e) => e.school).length} education entr{data.education.filter((e) => e.school).length === 1 ? 'y' : 'ies'}</li>
          <li>✓ Skills: {data.skills.split(',').filter(Boolean).length} listed</li>
        </ul>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <p className="text-sm text-slate-500 mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-500" />
          After clicking below, you&apos;ll be prompted to pay ₦1,000 to generate your resume.
        </p>
        <div className="flex justify-between">
          <button type="button" onClick={onBack} className="btn-secondary" disabled={isSubmitting}>
            ← Back
          </button>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Pay & Generate Resume
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
