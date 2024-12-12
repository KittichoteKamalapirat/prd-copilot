import { initAdmin } from '@/firebase/firebaseAdmin'
import { stripe } from '@/lib/stripe'
import { FbSubscription } from '@/lib/types/User'
import * as admin from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'
import { Timestamp } from 'firebase/firestore'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  console.log('got stripe webhook')
  try {
    const body = await req.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof Stripe.errors.StripeError) {
        return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 })
      }

      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        console.log(JSON.stringify(session, null, 4))
        // Handle successful payment
        // Retrieve the customer ID and user ID from the session
        const customerId = session.customer as string
        const userId = (session.metadata as { firebaseUserId: string }).firebaseUserId // TODO: centralize types

        // Fetch the user document from Firestore
        await initAdmin() // need to call this before getFirestore
        const firestore = getFirestore()
        const userDocRef = await firestore.collection('users').doc(userId)

        const userDoc = await userDocRef.get()

        // Retrieve the session with expanded line items
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ['line_items'],
        })

        const subscriptionCents = session.amount_total ? session.amount_total : 0
        const priceId = sessionWithLineItems.line_items?.data[0].price?.id
        const productId = sessionWithLineItems.line_items?.data[0].price?.product
        const productName = sessionWithLineItems.line_items?.data[0].description

        const subscription: FbSubscription = {
          customerId: customerId,
          cents: subscriptionCents,
          priceId: priceId || 'unknown',
          productName: productName || 'unknown',
          productId: typeof productId === 'string' ? productId : 'unknown',
          expiresAt: admin.firestore.Timestamp.fromDate(
            new Date(session.expires_at * 1000)
          ) as Timestamp,
        }
        if (userDoc.exists) {
          await userDocRef.set({ subscription }, { merge: true })
        }

        console.log('Payment successful:', session.id)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        // Handle failed payment
        console.log('Payment failed:', paymentIntent.id)
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

// Disable body parsing, needed for webhook signature verification
export const config = {
  api: {
    bodyParser: false,
  },
}
