import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zeender — Build a Job-Winning Resume in Minutes',
  description:
    'AI-powered resume builder that tailors your resume to any job description. Pay ₦1,000 per resume and get a professional PDF delivered to your inbox.',
  keywords: 'resume builder, AI resume, professional resume, Nigeria, job application, Zeender',
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
