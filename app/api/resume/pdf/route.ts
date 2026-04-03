import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'
import { ModernTemplate } from '@/lib/pdf-templates/modern'
import { ClassicTemplate } from '@/lib/pdf-templates/classic'
import { ExecutiveTemplate } from '@/lib/pdf-templates/executive'
import { sendResumeEmail } from '@/lib/resend'
import { pdf } from '@react-pdf/renderer'
import { GeneratedResume } from '@/types'
import React from 'react'

// Force Node.js runtime — required for @react-pdf/renderer
export const runtime = 'nodejs'

function getServiceClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(request: Request) {
  const authSupabase = createClient()
  const {
    data: { user },
  } = await authSupabase.auth.getUser()

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { resumeId } = await request.json()
  if (!resumeId) {
    return Response.json({ error: 'resumeId is required' }, { status: 400 })
  }

  // Use service client for storage operations
  const serviceSupabase = getServiceClient()

  // Fetch resume from database
  const { data: resume, error: fetchError } = await authSupabase
    .from('resumes')
    .select('*')
    .eq('id', resumeId)
    .eq('user_id', user.id)
    .single()

  if (fetchError || !resume) {
    return Response.json({ error: 'Resume not found' }, { status: 404 })
  }

  // If PDF already generated, return existing URL
  if (resume.pdf_url) {
    return Response.json({ pdfUrl: resume.pdf_url })
  }

  const content = resume.content as GeneratedResume & {
    _personal?: {
      fullName: string
      jobTitle: string
      email: string
      phone: string
      location: string
      template?: 'modern' | 'classic' | 'executive'
    }
  }

  // Use personal info from the form — falls back to auth email only if missing
  const personal = content._personal
  const candidateName = personal?.fullName || user.email?.split('@')[0] || 'Candidate'
  const jobTitle      = personal?.jobTitle  || content.experience?.[0]?.role || 'Professional'
  const candidateEmail    = personal?.email    || user.email || ''
  const candidatePhone    = personal?.phone    || ''
  const candidateLocation = personal?.location || ''

  // ─── Render PDF ────────────────────────────────────────────────────────────
  const templateId = personal?.template || 'modern'
  const templateProps = {
    resume: content,
    candidateName,
    jobTitle,
    email:    candidateEmail,
    phone:    candidatePhone,
    location: candidateLocation,
  }
  const TemplateComponent =
    templateId === 'classic'   ? ClassicTemplate :
    templateId === 'executive' ? ExecutiveTemplate :
                                 ModernTemplate

  let pdfBuffer: Buffer
  try {
    const pdfInstance = pdf(React.createElement(TemplateComponent, templateProps))
    pdfBuffer = await pdfInstance.toBuffer()
  } catch (err) {
    console.error('PDF render error:', err)
    return Response.json({ error: 'Failed to render PDF' }, { status: 500 })
  }

  // ─── Upload to Supabase Storage ────────────────────────────────────────────
  const fileName = `${user.id}/${resumeId}.pdf`

  const { error: uploadError } = await serviceSupabase.storage
    .from('resumes')
    .upload(fileName, pdfBuffer, {
      contentType: 'application/pdf',
      upsert: true,
    })

  if (uploadError) {
    console.error('Storage upload error:', uploadError)
    return Response.json({ error: 'Failed to upload PDF' }, { status: 500 })
  }

  // ─── Get public URL ────────────────────────────────────────────────────────
  const {
    data: { publicUrl },
  } = serviceSupabase.storage.from('resumes').getPublicUrl(fileName)

  // ─── Update resume record with PDF URL ────────────────────────────────────
  await authSupabase
    .from('resumes')
    .update({ pdf_url: publicUrl })
    .eq('id', resumeId)

  // ─── Send email ────────────────────────────────────────────────────────────
  try {
    await sendResumeEmail({
      to: user.email!,
      name: candidateName,
      pdfUrl: publicUrl,
    })
  } catch (emailErr) {
    // Don't fail the request if email fails — PDF is already generated
    console.error('Email send error:', emailErr)
  }

  return Response.json({ pdfUrl: publicUrl })
}
