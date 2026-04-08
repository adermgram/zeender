import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

// Use service role for webhook — no user session context
function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(request: Request) {
  const rawBody = await request.text()

  // Verify Paystack webhook signature
  const paystackSignature = request.headers.get('x-paystack-signature')
  if (!paystackSignature) {
    return Response.json({ error: 'No signature' }, { status: 401 })
  }

  const expectedHash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
    .update(rawBody)
    .digest('hex')

  if (expectedHash !== paystackSignature) {
    return Response.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const event = JSON.parse(rawBody)

  if (event.event === 'charge.success') {
    const { reference, amount, customer } = event.data

    // Only process the expected amount
    if (amount !== 1000) {
      return Response.json({ received: true })
    }

    const supabase = getServiceClient()
    await supabase
      .from('payments')
      .update({ status: 'success' })
      .eq('paystack_reference', reference)
      .eq('status', 'pending') // idempotency guard
  }

  return Response.json({ received: true })
}
