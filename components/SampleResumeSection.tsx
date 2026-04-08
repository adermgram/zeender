'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const person = {
  name: 'Kwame Mensah',
  title: 'Senior Software Engineer',
  email: 'kwame.mensah@email.com',
  phone: '+233 244 123 456',
  location: 'Accra, Ghana',
  summary:
    'Results-driven Senior Software Engineer with 5+ years of experience building scalable fintech products across web and mobile platforms. Proven track record of reducing system latency by 40% and leading cross-functional teams to ship features on time. Passionate about clean architecture and delivering measurable business impact.',
  experience: [
    {
      role: 'Senior Software Engineer',
      company: 'MTN Ghana',
      duration: 'Jan 2022 – Present',
      bullets: [
        'Architected a real-time mobile money notification system processing 2M+ transactions daily, reducing latency by 40%',
        'Led a team of 6 engineers to rebuild the merchant dashboard in React + TypeScript, cutting load time from 4.2s to 1.1s',
        'Designed REST APIs consumed by 300+ enterprise partners, maintaining 99.98% uptime SLA',
      ],
    },
    {
      role: 'Software Engineer',
      company: 'Ecobank Ghana',
      duration: 'Mar 2019 – Dec 2021',
      bullets: [
        'Built and maintained core banking integrations using Node.js, serving 500K+ active customers across West Africa',
        'Reduced deployment time by 65% by introducing CI/CD pipelines with GitHub Actions and Docker',
      ],
    },
  ],
  education: { degree: 'B.Sc. Computer Science', school: 'University of Ghana, Legon', year: '2018 · First Class Honours' },
  skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL', 'Redis'],
}

const tabs = ['Modern', 'Classic', 'Executive'] as const
type Tab = typeof tabs[number]

/* ── Template renderers ──────────────────────────────────────────────────── */

function ModernResume() {
  return (
    <div className="bg-white">
      {/* Dark header */}
      <div className="bg-slate-900 px-8 sm:px-12 py-8">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">{person.name}</h1>
        <p className="text-brand-400 font-semibold mt-1 text-sm">{person.title}</p>
        <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-400">
          <span>{person.email}</span>
          <span>{person.phone}</span>
          <span>{person.location}</span>
        </div>
      </div>
      {/* Body */}
      <div className="px-8 sm:px-12 py-8 space-y-6">
        <div>
          <h2 className="text-[10px] font-bold text-brand-500 uppercase tracking-widest mb-2 border-b border-brand-100 pb-1">
            Summary
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">{person.summary}</p>
        </div>
        <div>
          <h2 className="text-[10px] font-bold text-brand-500 uppercase tracking-widest mb-3 border-b border-brand-100 pb-1">
            Experience
          </h2>
          <div className="space-y-4">
            {person.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{exp.role}</p>
                    <p className="text-brand-600 text-xs font-medium">{exp.company}</p>
                  </div>
                  <p className="text-xs text-slate-400 shrink-0 ml-4">{exp.duration}</p>
                </div>
                <ul className="mt-2 space-y-1">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="text-xs text-slate-600 flex gap-2">
                      <span className="text-brand-400 shrink-0">▸</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h2 className="text-[10px] font-bold text-brand-500 uppercase tracking-widest mb-2 border-b border-brand-100 pb-1">Education</h2>
            <p className="font-bold text-slate-900 text-sm">{person.education.degree}</p>
            <p className="text-xs text-slate-500">{person.education.school}</p>
            <p className="text-xs text-slate-400">{person.education.year}</p>
          </div>
          <div>
            <h2 className="text-[10px] font-bold text-brand-500 uppercase tracking-widest mb-2 border-b border-brand-100 pb-1">Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {person.skills.map((s) => (
                <span key={s} className="text-xs bg-brand-50 text-brand-700 border border-brand-100 px-2 py-0.5 rounded-md">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ClassicResume() {
  return (
    <div className="bg-white px-8 sm:px-12 py-8">
      {/* Centered header */}
      <div className="text-center pb-5 mb-5 border-b-2 border-slate-900">
        <h1 className="text-2xl font-extrabold text-slate-900 uppercase tracking-widest">{person.name}</h1>
        <p className="text-slate-600 text-sm mt-1">{person.title}</p>
        <div className="flex flex-wrap justify-center gap-3 mt-2 text-xs text-slate-500">
          <span>{person.email}</span>
          <span>·</span>
          <span>{person.phone}</span>
          <span>·</span>
          <span>{person.location}</span>
        </div>
      </div>
      <div className="space-y-5">
        <div>
          <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">{person.summary}</p>
        </div>
        <div>
          <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1 mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {person.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{exp.role}</p>
                    <p className="text-sm text-slate-600 italic">{exp.company}</p>
                  </div>
                  <p className="text-xs text-slate-500 shrink-0 ml-4">{exp.duration}</p>
                </div>
                <ul className="mt-1.5 space-y-0.5">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="text-xs text-slate-600 flex gap-2">
                      <span className="shrink-0">–</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">Education</h2>
            <p className="font-bold text-slate-900 text-sm">{person.education.degree}</p>
            <p className="text-xs text-slate-600 italic">{person.education.school}</p>
            <p className="text-xs text-slate-500">{person.education.year}</p>
          </div>
          <div>
            <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">Skills</h2>
            <p className="text-xs text-slate-600 leading-relaxed">{person.skills.join(' · ')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ExecutiveResume() {
  return (
    <div className="bg-white flex flex-col sm:flex-row">
      {/* Dark sidebar */}
      <div className="bg-slate-800 sm:w-56 shrink-0 px-6 py-8 text-white">
        <div className="mb-6">
          <h1 className="text-lg font-extrabold leading-tight">{person.name}</h1>
          <p className="text-gold-400 font-semibold text-xs mt-1">{person.title}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Contact</h2>
          <div className="space-y-1 text-xs text-slate-300">
            <p>{person.email}</p>
            <p>{person.phone}</p>
            <p>{person.location}</p>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Skills</h2>
          <div className="space-y-1">
            {person.skills.map((s) => (
              <p key={s} className="text-xs text-slate-300">› {s}</p>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Education</h2>
          <p className="text-xs font-semibold text-white">{person.education.degree}</p>
          <p className="text-xs text-slate-300">{person.education.school}</p>
          <p className="text-xs text-slate-400">{person.education.year}</p>
        </div>
      </div>
      {/* Main */}
      <div className="flex-1 px-7 py-8 space-y-5">
        <div>
          <h2 className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-2">Summary</h2>
          <p className="text-xs text-slate-700 leading-relaxed">{person.summary}</p>
        </div>
        <div>
          <h2 className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-3">Experience</h2>
          <div className="space-y-4">
            {person.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{exp.role}</p>
                    <p className="text-gold-600 text-xs font-semibold">{exp.company}</p>
                  </div>
                  <p className="text-xs text-slate-400 shrink-0 ml-4">{exp.duration}</p>
                </div>
                <ul className="mt-1.5 space-y-1">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="text-xs text-slate-600 flex gap-2">
                      <span className="text-gold-400 shrink-0">›</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main section ────────────────────────────────────────────────────────── */

export default function SampleResumeSection() {
  const [active, setActive] = useState<Tab>('Modern')

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            See what you&apos;ll get
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Real output from cvMaxGhana — AI-written, tailored to a job description. Choose a template style below.
          </p>
        </div>

        {/* Template tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-white border border-slate-200 rounded-2xl p-1 gap-1 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  active === tab
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Document card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
          {/* Browser chrome */}
          <div className="bg-slate-50 border-b border-slate-100 px-5 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-300" />
            <div className="w-3 h-3 rounded-full bg-amber-300" />
            <div className="w-3 h-3 rounded-full bg-emerald-300" />
            <div className="ml-3 flex-1 bg-white border border-slate-200 rounded-md px-3 py-1 text-xs text-slate-400">
              cvmaxghana-cv-kwame-mensah-{active.toLowerCase()}.pdf
            </div>
          </div>

          {/* Active template */}
          {active === 'Modern'    && <ModernResume />}
          {active === 'Classic'   && <ClassicResume />}
          {active === 'Executive' && <ExecutiveResume />}

          {/* Footer strip */}
          <div className="bg-brand-50 border-t border-brand-100 px-8 sm:px-12 py-4 flex items-center justify-between">
            <p className="text-xs text-brand-600 font-medium">Generated by cvMaxGhana · ATS-optimized · {active} template</p>
            <Link href="/login" className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
              Build yours <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
