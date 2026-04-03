'use client'

import { CheckCircle } from 'lucide-react'

interface Step {
  number: number
  title: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-8 relative">
      {/* Connector line behind everything */}
      <div className="absolute top-5 left-0 right-0 h-px bg-slate-200 z-0" />

      {steps.map((step, index) => {
        const isCompleted = currentStep > step.number
        const isActive = currentStep === step.number
        const isUpcoming = currentStep < step.number

        return (
          <div key={step.number} className="flex flex-col items-center z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                isCompleted
                  ? 'bg-brand-600 border-brand-600 text-white'
                  : isActive
                  ? 'bg-white border-brand-600 text-brand-600 shadow-md shadow-brand-100'
                  : 'bg-white border-slate-200 text-slate-400'
              }`}
            >
              {isCompleted ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                step.number
              )}
            </div>
            <span
              className={`mt-2 text-xs font-medium hidden sm:block transition-colors ${
                isActive ? 'text-brand-600' : isCompleted ? 'text-slate-700' : 'text-slate-400'
              }`}
            >
              {step.title}
            </span>
          </div>
        )
      })}
    </div>
  )
}
