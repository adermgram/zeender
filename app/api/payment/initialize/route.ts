import { createClient } from '@/lib/supabase/server'

export async function POST() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Create a unique reference
  const reference = `cv_${user.id.slice(0, 8)}_${Date.now()}`

  const { data: payment, error } = await supabase
    .from('payments')
    .insert({
      user_id: user.id,
      paystack_reference: reference,
      amount: 1000, // GH₵10 in pesewas — ALWAYS set server-side, never trust frontend
      status: 'pending',
    })
    .select()
    .single()

  if (error) {
    console.error('Payment insert error:', error)
    return Response.json({ error: 'Failed to initialize payment' }, { status: 500 })
  }

  return Response.json({
    reference,
    paymentId: payment.id,
    amount: 1000,
  })
}
