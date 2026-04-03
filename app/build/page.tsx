import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import BuildClient from './BuildClient'

export default async function BuildPage({
  searchParams,
}: {
  searchParams: { paymentId?: string }
}) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // If a paymentId was passed, verify it belongs to this user and is valid
  let existingPaymentId: string | undefined
  if (searchParams.paymentId) {
    const { data: payment } = await supabase
      .from('payments')
      .select('id')
      .eq('id', searchParams.paymentId)
      .eq('user_id', user.id)
      .eq('status', 'success')
      .is('resumes.payment_id', null) // ensure no resume yet — checked below
      .single()

    // Double check: no resume generated for this payment yet
    const { data: existingResume } = await supabase
      .from('resumes')
      .select('id')
      .eq('payment_id', searchParams.paymentId)
      .single()

    if (payment && !existingResume) {
      existingPaymentId = payment.id
    }
  }

  return (
    <BuildClient
      userEmail={user.email!}
      existingPaymentId={existingPaymentId}
    />
  )
}
