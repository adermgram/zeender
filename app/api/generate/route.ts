import { createClient } from '@/lib/supabase/server'
import { generateResume } from '@/lib/groq'

export async function POST(request: Request) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { formData, paymentId, previewContent } = await request.json()

  if (!formData || !paymentId) {
    return Response.json({ error: 'formData and paymentId are required' }, { status: 400 })
  }

  // ─── Payment gate: verify the payment belongs to this user and is successful ──
  const { data: payment } = await supabase
    .from('payments')
    .select('id, status')
    .eq('id', paymentId)
    .eq('user_id', user.id)
    .eq('status', 'success')
    .single()

  if (!payment) {
    return Response.json(
      { error: 'A verified payment is required to generate a resume.' },
      { status: 402 }
    )
  }

  // ─── Idempotency: don't generate twice for the same payment ──────────────────
  const { data: existingResume } = await supabase
    .from('resumes')
    .select('id')
    .eq('payment_id', paymentId)
    .single()

  if (existingResume) {
    return Response.json(
      { error: 'A resume has already been generated for this payment.' },
      { status: 409 }
    )
  }

  // ─── Persist full name to profile (Magic Link auth provides no name) ────────
  if (formData.fullName) {
    await supabase
      .from('profiles')
      .upsert({ id: user.id, email: user.email!, full_name: formData.fullName })
      .eq('id', user.id)
  }

  // ─── Generate via Groq (skip if preview content already exists) ──────────────
  try {
    const resumeContent = previewContent ?? await generateResume(formData)

    // ─── Save to database ─────────────────────────────────────────────────────
    // Store personal info alongside AI content so the PDF route can use
    // the name/email/phone the user typed — not their auth email.
    const { data: resume, error: insertError } = await supabase
      .from('resumes')
      .insert({
        user_id: user.id,
        content: {
          ...resumeContent,
          _personal: {
            fullName:  formData.fullName,
            jobTitle:  formData.jobTitle,
            email:     formData.email,
            phone:     formData.phone,
            location:  formData.location,
            template:  formData.template || 'modern',
          },
        },
        payment_id: paymentId,
      })
      .select()
      .single()

    if (insertError || !resume) {
      console.error('Resume insert error:', insertError)
      return Response.json({ error: 'Failed to save resume' }, { status: 500 })
    }

    return Response.json({ resumeId: resume.id, resume: resumeContent })
  } catch (err: any) {
    // Handle Groq rate limits (429) gracefully
    if (err?.status === 429 || err?.message?.toLowerCase().includes('rate limit')) {
      return Response.json(
        {
          error:
            'The AI is currently busy. Please wait 30 seconds and try again.',
        },
        { status: 429 }
      )
    }

    console.error('Generate route error:', err)
    return Response.json(
      { error: 'Resume generation failed. Please try again.' },
      { status: 500 }
    )
  }
}
