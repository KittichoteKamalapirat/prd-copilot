import { stripe } from '@/lib/stripe'
import { CheckoutSessionProps } from '@/lib/types/CheckoutSessionProps'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const TRIAL_PERIOD_DAYS = 7

export async function POST(req: Request) {
  try {
    const { userId, priceId, successUrl, cancelUrl } = (await req.json()) as CheckoutSessionProps

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      subscription_data: {
        trial_period_days: TRIAL_PERIOD_DAYS,
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { firebaseUserId: userId }, // Add user ID to metadata
      expand: ['line_items'], // so I can get priceId and product ID in webhooks
    })

    return NextResponse.json({ sessionId: session.id })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 })
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
