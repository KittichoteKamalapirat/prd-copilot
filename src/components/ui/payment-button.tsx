'use client'
import { v4 as uuidv4 } from 'uuid'

import { MemberPlan } from '@/app/enums/MemberPlan'
import { Spinner } from '@/components/ui/spinner'
import { CheckoutSessionProps } from '@/lib/types/CheckoutSessionProps'
import { ObjectValues } from '@/lib/utils'
import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'
import { Button } from './button'
import { useCreatePrdInFirestore } from '../../hooks/useCreatePrdInFirestore'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  label?: string
  userId: string
  plan: ObjectValues<typeof MemberPlan>
}

export function PaymentButton({
  userId,
  label = 'Subscribe',
  plan,

  ...rest
}: Props) {
  const { createPrdInFirestore, isLoading: isCreatingPrd } = useCreatePrdInFirestore()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const stripePriceId = (() => {
    switch (plan) {
      case 'yearly':
        return process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID as string
      default:
      case 'monthly':
        return process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID as string
    }
  })()
  const handlePayment = async () => {
    try {
      setIsLoading(true)
      const stripe = await stripePromise

      if (!stripe) throw new Error('Stripe failed to load')

      const prdId = uuidv4()
      createPrdInFirestore(userId, prdId)

      const body: CheckoutSessionProps = {
        priceId: stripePriceId,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
        userId,
        prdId,
      }
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const { sessionId } = await response.json()

      await stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      console.error('Payment error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handlePayment} {...rest}>
      {isLoading || isCreatingPrd ? <Spinner className="text-white" /> : label}
    </Button>
  )
}
