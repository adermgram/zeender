'use client'

import { Lock, Download, X, MapPin, Mail, Phone } from 'lucide-react'
import { GeneratedResume, ResumeFormData } from '@/types'

interface ResumePreviewProps {
  resume: GeneratedResume
  formData: ResumeFormData
  onPay: () => void
  onClose: () => void
}

export default function ResumePreview({ resume, formData, onPay, onClose }: ResumePreviewProps) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl my-6">

        {/* Top bar */}
        <div className="bg-white rounded-t-2xl px-5 py-4 flex items-center justify-between border-b border-slate-100">
          <div>
            <p className="font-bold text-slate-900 text-[15px]">Your Resume Preview</p>
            <p className="text-xs text-slate-400 mt-0.5">Pay to unlock the full PDF download</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Resume content */}
        <div className="bg-white relative overflow-hidden">

          {/* ── Visible section: header ── */}
          <div className="px-10 pt-8 pb-6 border-b border-slate-100">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{formData.fullName}</h1>
            <p className="text-brand-600 font-semibold mt-1">{formData.jobTitle}</p>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-500">
              {formData.email && (
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> {formData.email}
                </span>
              )}
              {formData.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> {formData.phone}
                </span>
              )}
              {formData.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> {formData.location}
                </span>
              )}
            </div>
          </div>

          {/* ── Blurred section ── */}
          <div className="relative">
            <div className="px-10 py-6 space-y-6 select-none" style={{ filter: 'blur(4px)', userSelect: 'none' }}>

              {/* Summary */}
              <div>
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Professional Summary
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">{resume.summary}</p>
              </div>

              {/* Experience */}
              {resume.experience?.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                    Work Experience
                  </h2>
                  <div className="space-y-5">
                    {resume.experience.map((exp, i) => (
                      <div key={i}>
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <p className="font-semibold text-slate-900 text-sm">{exp.role}</p>
                            <p className="text-slate-500 text-sm">{exp.company}</p>
                          </div>
                          <p className="text-xs text-slate-400 shrink-0 ml-4">{exp.duration}</p>
                        </div>
                        <ul className="mt-2 space-y-1">
                          {exp.bullets?.map((b, j) => (
                            <li key={j} className="text-sm text-slate-600 flex gap-2">
                              <span className="shrink-0 text-brand-400 mt-0.5">▸</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {resume.education?.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                    Education
                  </h2>
                  <div className="space-y-2">
                    {resume.education.map((edu, i) => (
                      <div key={i} className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{edu.degree}</p>
                          <p className="text-slate-500 text-sm">{edu.school}</p>
                        </div>
                        <p className="text-xs text-slate-400 shrink-0 ml-4">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {resume.skills?.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.map((skill, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Gradient fade + CTA overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.85) 30%, white 60%)' }}
            >
              <div className="mt-24 text-center px-6">
                <div className="w-16 h-16 bg-brand-50 border border-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-7 h-7 text-brand-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Your resume is ready!</h3>
                <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto leading-relaxed">
                  Pay ₦1,000 to unlock the full PDF — formatted, ATS-optimized, and sent to your email.
                </p>
                <button onClick={onPay} className="btn-primary px-8 py-4 text-base shadow-lg shadow-brand-100">
                  <Download className="w-5 h-5" />
                  Pay ₦1,000 &amp; Download PDF
                </button>
                <p className="text-xs text-slate-400 mt-3">Secure payment via Paystack · One-time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom rounded cap */}
        <div className="bg-white rounded-b-2xl h-4" />
      </div>
    </div>
  )
}
