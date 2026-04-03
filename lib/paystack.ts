const PAYSTACK_BASE = 'https://api.paystack.co'

export async function verifyPaystackTransaction(reference: string): Promise<{
  status: boolean
  data: {
    status: string
    amount: number
    customer: { email: string }
    reference: string
  }
}> {
  const response = await fetch(
    `${PAYSTACK_BASE}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Paystack verification failed: ${response.statusText}`)
  }

  return response.json()
}
