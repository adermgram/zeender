import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'cvMaxGhana — Build a Job-Winning CV in Minutes',
  description:
    'AI-powered CV builder that tailors your CV to any job description. Pay GH₵10 per CV and get a professional PDF delivered to your inbox.',
  keywords: 'CV builder, AI CV, professional CV, Ghana, job application, cvMaxGhana, curriculum vitae',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 antialiased">{children}</body>
    </html>
  )
}
