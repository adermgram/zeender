'use client'

import { ResumeFormData, WorkExperience } from '@/types'
import { Plus, Trash2, Briefcase } from 'lucide-react'

interface WorkExperienceStepProps {
  data: ResumeFormData
  onChange: (data: Partial<ResumeFormData>) => void
  onNext: () => void
  onBack: () => void
}

const emptyJob: WorkExperience = {
  company: '',
  role: '',
  duration: '',
  description: '',
}

export default function WorkExperienceStep({
  data,
  onChange,
  onNext,
  onBack,
}: WorkExperienceStepProps) {
  function updateJob(index: number, field: keyof WorkExperience, value: string) {
    const updated = data.experience.map((job, i) =>
      i === index ? { ...job, [field]: value } : job
    )
    onChange({ experience: updated })
  }

  function addJob() {
    if (data.experience.length < 3) {
      onChange({ experience: [...data.experience, { ...emptyJob }] })
    }
  }

  function removeJob(index: number) {
    onChange({ experience: data.experience.filter((_, i) => i !== index) })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">Work Experience</h2>
        <p className="text-slate-500 text-sm">
          Add up to 3 recent roles. Be as detailed as possible — better input = better AI output.
        </p>
      </div>

      <div className="space-y-4">
        {data.experience.map((job, index) => (
          <div key={index} className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-3.5 h-3.5 text-brand-600" />
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  Job {index + 1}
                </span>
              </div>
              {data.experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeJob(index)}
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="label">Company *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Flutterwave"
                  value={job.company}
                  onChange={(e) => updateJob(index, 'company', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="label">Role / Job Title *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Backend Engineer"
                  value={job.role}
                  onChange={(e) => updateJob(index, 'role', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="label">Duration *</label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. Jan 2022 – Present"
                value={job.duration}
                onChange={(e) => updateJob(index, 'duration', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">
                Key responsibilities & achievements *
              </label>
              <textarea
                className="input-field resize-none"
                rows={4}
                placeholder="Describe what you did, built, or achieved. Include numbers where possible — e.g. 'Reduced API latency by 40%', 'Led a team of 5 engineers', 'Increased revenue by ₦2M through automation'."
                value={job.description}
                onChange={(e) => updateJob(index, 'description', e.target.value)}
                required
              />
            </div>
          </div>
        ))}
      </div>

      {data.experience.length < 3 && (
        <button
          type="button"
          onClick={addJob}
          className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-200 rounded-xl text-sm font-medium text-slate-500 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Another Job ({data.experience.length}/3)
        </button>
      )}

      <div className="pt-2 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">
          ← Back
        </button>
        <button type="submit" className="btn-primary">
          Next: Education & Skills →
        </button>
      </div>
    </form>
  )
}
