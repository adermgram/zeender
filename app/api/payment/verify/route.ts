import { createClient } from '@/lib/supabase/server'
import { verifyPaystackTransaction } from '@/lib/paystack'

export async function POST(request: Request) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { reference } = await request.json()

  if (!reference || typeof reference !== 'string') {
    return Response.json({ error: 'Reference is required' }, { status: 400 })
  }

  // Confirm this reference belongs to this user
  const { data: existingPayment } = await supabase
    .from('payments')
    .select('id, status')
    .eq('paystack_reference', reference)
    .eq('user_id', user.id)
    .single()

  if (!existingPayment) {
    return Response.json({ error: 'Payment record not found' }, { status: 404 })
  }

  // If already verified, just return success
  if (existingPayment.status === 'success') {
    return Response.json({ success: true, paymentId: existingPayment.id })
  }

  // Verify with Paystack server-side
  let paystackData
  try {
    paystackData = await verifyPaystackTransaction(reference)
  } catch (err) {
    return Response.json({ error: 'Could not reach payment provider' }, { status: 502 })
  }

  if (!paystackData.status || paystackData.data.status !== 'success') {
    await supabase
      .from('payments')
      .update({ status: 'failed' })
      .eq('paystack_reference', reference)

    return Response.json({ error: 'Payment was not successful' }, { status: 400 })
  }

  // ─── CRITICAL: Verify amount server-side — never trust the client ─────────
  if (paystackData.data.amount !== 1000) {
    return Response.json(
      { error: 'Invalid payment amount. Expected GH₵10.' },
      { status: 400 }
    )
  }

  // Mark payment as successful
  const { data: updatedPayment, error } = await supabase
    .from('payments')
    .update({ status: 'success' })
    .eq('paystack_reference', reference)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error || !updatedPayment) {
    return Response.json({ error: 'Failed to update payment status' }, { status: 500 })
  }

  return Response.json({ success: true, paymentId: updatedPayment.id })
}
