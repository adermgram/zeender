'use client'

import { CheckCircle } from 'lucide-react'

export type TemplateId = 'modern' | 'classic' | 'executive'

const templates: {
  id: TemplateId
  name: string
  description: string
  preview: React.ReactNode
}[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Dark header, indigo accents, skill chips',
    preview: (
      <div className="w-full h-full bg-white rounded overflow-hidden text-[4px] leading-none">
        <div className="bg-slate-800 px-2 py-1.5">
          <div className="w-10 h-1 bg-white rounded mb-0.5" />
          <div className="w-7 h-0.5 bg-slate-400 rounded mb-0.5" />
          <div className="flex gap-1">
            <div className="w-5 h-0.5 bg-slate-500 rounded" />
            <div className="w-5 h-0.5 bg-slate-500 rounded" />
          </div>
        </div>
        <div className="px-2 py-1.5 space-y-1.5">
          <div>
            <div className="w-8 h-0.5 bg-indigo-400 rounded mb-0.5" />
            <div className="w-full h-0.5 bg-slate-200 rounded mb-0.5" />
            <div className="w-5/6 h-0.5 bg-slate-200 rounded" />
          </div>
          <div>
            <div className="w-8 h-0.5 bg-indigo-400 rounded mb-0.5" />
            {[1,2].map(i => (
              <div key={i} className="mb-1">
                <div className="flex justify-between mb-0.5">
                  <div className="w-8 h-0.5 bg-slate-700 rounded" />
                  <div className="w-5 h-0.5 bg-slate-300 rounded" />
                </div>
                <div className="w-6 h-0.5 bg-indigo-300 rounded mb-0.5" />
                <div className="w-full h-0.5 bg-slate-200 rounded" />
                <div className="w-4/5 h-0.5 bg-slate-200 rounded mt-0.5" />
              </div>
            ))}
          </div>
          <div className="flex gap-0.5 flex-wrap">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-indigo-100 rounded px-0.5 py-px w-4 h-1" />
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Clean black & white, traditional format',
    preview: (
      <div className="w-full h-full bg-white rounded overflow-hidden text-[4px] leading-none px-2 py-2 space-y-1.5">
        <div className="text-center mb-1">
          <div className="w-12 h-1 bg-slate-800 rounded mx-auto mb-0.5" />
          <div className="w-8 h-0.5 bg-slate-400 rounded mx-auto mb-0.5" />
          <div className="w-16 h-px bg-slate-800 mx-auto mb-0.5" />
          <div className="flex justify-center gap-1">
            <div className="w-5 h-0.5 bg-slate-400 rounded" />
            <div className="w-5 h-0.5 bg-slate-400 rounded" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-0.5">
            <div className="w-6 h-0.5 bg-slate-800 rounded" />
            <div className="flex-1 h-px bg-slate-300" />
          </div>
          <div className="w-full h-0.5 bg-slate-200 rounded mb-0.5" />
          <div className="w-5/6 h-0.5 bg-slate-200 rounded" />
        </div>
        <div>
          <div className="flex items-center gap-1 mb-0.5">
            <div className="w-8 h-0.5 bg-slate-800 rounded" />
            <div className="flex-1 h-px bg-slate-300" />
          </div>
          {[1,2].map(i => (
            <div key={i} className="mb-1">
              <div className="flex justify-between mb-0.5">
                <div className="w-7 h-0.5 bg-slate-700 rounded" />
                <div className="w-4 h-0.5 bg-slate-400 rounded" />
              </div>
              <div className="w-5 h-0.5 bg-slate-400 rounded mb-0.5" />
              <div className="w-full h-0.5 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Two-column sidebar, amber accents',
    preview: (
      <div className="w-full h-full bg-white rounded overflow-hidden flex text-[4px] leading-none">
        <div className="w-1/3 bg-slate-900 px-1.5 py-2 space-y-1">
          <div className="w-8 h-1 bg-white rounded mb-0.5" />
          <div className="w-5 h-0.5 bg-amber-400 rounded mb-1" />
          <div className="w-full h-px bg-slate-700 mb-1" />
          <div className="w-4 h-0.5 bg-amber-400 rounded mb-0.5" />
          <div className="w-full h-0.5 bg-slate-500 rounded" />
          <div className="w-5/6 h-0.5 bg-slate-500 rounded" />
          <div className="w-4 h-0.5 bg-amber-400 rounded mb-0.5 mt-1" />
          {[1,2,3].map(i => (
            <div key={i} className="w-full h-0.5 bg-slate-600 rounded" />
          ))}
        </div>
        <div className="flex-1 px-1.5 py-2 space-y-1.5">
          <div>
            <div className="w-5 h-0.5 bg-slate-800 rounded mb-0.5" />
            <div className="w-5 h-px bg-amber-400 rounded mb-0.5" />
            <div className="w-full h-0.5 bg-slate-200 rounded" />
            <div className="w-5/6 h-0.5 bg-slate-200 rounded mt-0.5" />
          </div>
          <div>
            <div className="w-6 h-0.5 bg-slate-800 rounded mb-0.5" />
            <div className="w-5 h-px bg-amber-400 rounded mb-0.5" />
            {[1,2].map(i => (
              <div key={i} className="mb-1">
                <div className="flex justify-between mb-0.5">
                  <div className="w-6 h-0.5 bg-slate-700 rounded" />
                  <div className="w-3 h-0.5 bg-slate-300 rounded" />
                </div>
                <div className="w-4 h-0.5 bg-amber-300 rounded mb-0.5" />
                <div className="w-full h-0.5 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
]

interface TemplateSelectorProps {
  selected: TemplateId
  onChange: (id: TemplateId) => void
}

export default function TemplateSelector({ selected, onChange }: TemplateSelectorProps) {
  return (
    <div>
      <p className="label mb-3">Choose a resume template</p>
      <div className="grid grid-cols-3 gap-3">
        {templates.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={`relative rounded-xl border-2 overflow-hidden transition-all duration-200 focus:outline-none ${
              selected === t.id
                ? 'border-brand-500 shadow-md shadow-brand-100'
                : 'border-slate-200 hover:border-brand-300'
            }`}
          >
            {/* Mini preview */}
            <div className="h-28 bg-slate-50 p-1.5">
              {t.preview}
            </div>

            {/* Label */}
            <div className="px-2 py-2 text-left border-t border-slate-100 bg-white">
              <p className="text-xs font-semibold text-slate-800 flex items-center gap-1">
                {t.name}
                {selected === t.id && (
                  <CheckCircle className="w-3 h-3 text-brand-500 ml-auto" />
                )}
              </p>
              <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                {t.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
