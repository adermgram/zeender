'use client'

import { ResumeFormData, Education } from '@/types'
import { Plus, Trash2, GraduationCap, Lightbulb } from 'lucide-react'

interface EducationSkillsProps {
  data: ResumeFormData
  onChange: (data: Partial<ResumeFormData>) => void
  onNext: () => void
  onBack: () => void
}

const emptyEdu: Education = { school: '', degree: '', year: '' }

export default function EducationSkills({
  data,
  onChange,
  onNext,
  onBack,
}: EducationSkillsProps) {
  function updateEdu(index: number, field: keyof Education, value: string) {
    const updated = data.education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    )
    onChange({ education: updated })
  }

  function addEdu() {
    onChange({ education: [...data.education, { ...emptyEdu }] })
  }

  function removeEdu(index: number) {
    onChange({ education: data.education.filter((_, i) => i !== index) })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">Education & Skills</h2>
        <p className="text-slate-500 text-sm">
          Add your qualifications and a list of your top skills.
        </p>
      </div>

      {/* Education */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <GraduationCap className="w-4 h-4 text-brand-600" />
          <h3 className="font-semibold text-slate-800 text-sm">Education</h3>
        </div>
        <div className="space-y-3">
          {data.education.map((edu, index) => (
            <div key={index} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Entry {index + 1}
                </span>
                {data.education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEdu(index)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="label">School / University *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. Unilag"
                    value={edu.school}
                    onChange={(e) => updateEdu(index, 'school', e.target.value)}
                    required
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="label">Degree / Certificate *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. B.Sc. Computer Science"
                    value={edu.degree}
                    onChange={(e) => updateEdu(index, 'degree', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="label">Year *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. 2020"
                    value={edu.year}
                    onChange={(e) => updateEdu(index, 'year', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addEdu}
          className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-sm font-medium text-slate-500 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {/* Skills */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-brand-600" />
          <h3 className="font-semibold text-slate-800 text-sm">Skills</h3>
        </div>
        <textarea
          className="input-field resize-none"
          rows={4}
          placeholder="List your skills separated by commas. e.g: Python, Django, PostgreSQL, Docker, REST APIs, Team Leadership, Agile, Git, AWS, Problem Solving"
          value={data.skills}
          onChange={(e) => onChange({ skills: e.target.value })}
          required
        />
        <p className="text-xs text-slate-400 mt-1.5">
          Include both technical and soft skills relevant to your target role.
        </p>
      </div>

      <div className="pt-2 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">
          ← Back
        </button>
        <button type="submit" className="btn-primary">
          Next: Target Job →
        </button>
      </div>
    </form>
  )
}
