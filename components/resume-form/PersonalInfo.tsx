'use client'

import { ResumeFormData } from '@/types'
import { User, Briefcase, Mail, Phone, MapPin } from 'lucide-react'

interface PersonalInfoProps {
  data: ResumeFormData
  onChange: (data: Partial<ResumeFormData>) => void
  onNext: () => void
}

export default function PersonalInfo({ data, onChange, onNext }: PersonalInfoProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">Personal Information</h2>
        <p className="text-slate-500 text-sm">Let&apos;s start with the basics.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" /> Full Name *
            </span>
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. Kwame Mensah"
            value={data.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-slate-400" /> Job Title *
            </span>
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. Software Engineer"
            value={data.jobTitle}
            onChange={(e) => onChange({ jobTitle: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" /> Email *
            </span>
          </label>
          <input
            type="email"
            className="input-field"
            placeholder="ada@example.com"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone
            </span>
          </label>
          <input
            type="tel"
            className="input-field"
            placeholder="+233 244 123 456"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="label">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" /> Location
          </span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="e.g. Accra, Ghana"
          value={data.location}
          onChange={(e) => onChange({ location: e.target.value })}
        />
      </div>

      <div className="pt-2 flex justify-end">
        <button type="submit" className="btn-primary">
          Next: Work Experience →
        </button>
      </div>
    </form>
  )
}
