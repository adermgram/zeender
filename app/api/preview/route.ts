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

  const { formData } = await request.json()

  if (!formData) {
    return Response.json({ error: 'formData is required' }, { status: 400 })
  }

  try {
    const resume = await generateResume(formData)
    return Response.json({ resume })
  } catch (err: any) {
    if (err?.status === 429 || err?.message?.toLowerCase().includes('rate limit')) {
      return Response.json(
        { error: 'The AI is currently busy. Please wait 30 seconds and try again.' },
        { status: 429 }
      )
    }
    console.error('Preview route error:', err)
    return Response.json({ error: 'Preview generation failed. Please try again.' }, { status: 500 })
  }
}
