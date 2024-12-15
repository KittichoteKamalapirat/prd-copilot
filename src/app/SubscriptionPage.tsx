'use client'
import { formatCentsToDollars } from '@/app/utils/currency'
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xm7WBJ38gaa
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import dayjs from 'dayjs'
import { DecodedIdToken } from 'next-firebase-auth-edge/auth'
import Layout from '../components/Layout'
import PricingSectionCards from '../components/PricingSectionCards'
import { Badge } from '../components/ui/badge'
import { Spinner } from '../components/ui/spinner'
import { useSubIsPro } from '../hooks/useSubIsPro'

interface Props {
  user: DecodedIdToken
}

export const SubscriptionPage = ({ user: authUser }: Props) => {
  const { isPro, loading, user } = useSubIsPro({ userId: authUser.uid })

  const customerId = user?.subscription?.customerId

  const handleManageSub = async (stripeCustomerId: string) => {
    try {
      const response = await fetch('/api/manage-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: stripeCustomerId,
          returnUrl: window.location.origin,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('Failed to create billing portal session')
      }
    } catch (error) {
      console.error('Error managing subscription:', error)
    }
  }

  if (loading)
    return (
      <Layout user={authUser} isPro={isPro}>
        <Spinner className="mt-12" />
      </Layout>
    )

  if (!isPro || !customerId)
    return (
      <Layout user={authUser} isPro={isPro}>
        <PricingSectionCards
          userId={authUser.uid}
          title="Become a better PM"
          description="Subscribe to unlock all features"
        />
      </Layout>
    )

  return (
    <Layout user={authUser} isPro={isPro}>
      <div className="grid gap-6 lg:gap-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tighter">Manage Subscription</h1>
          <p className="text-sm leading-none text-gray-500">
            Update your subscription preferences.
          </p>
        </div>
        <Card>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h2 className="mt-4 text-lg font-bold tracking-tighter">Current Subscription</h2>
              {isPro && (
                <p className="text-sm leading-none text-gray-500">
                  You are currently subscribed to the <Badge className="mt-3 uppercase">Pro</Badge>{' '}
                  plan.
                </p>
              )}
            </div>
            <div className="grid gap-1">
              <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                <div>Subscription Type</div>
                <div className="font-semibold">{user?.subscription?.productName}</div>

                {typeof user?.subscription?.cents === 'number' && (
                  <>
                    <div>Price</div>
                    <div className="font-semibold">
                      {formatCentsToDollars(user?.subscription?.cents)} / month
                    </div>
                  </>
                )}

                {user?.subscription?.expiresAt && (
                  <>
                    <div>Renewal Date</div>
                    <div className="font-semibold">
                      {dayjs(user?.subscription?.expiresAt.toDate()).format('MMMM D, YYYY')}
                    </div>
                  </>
                )}
              </div>
            </div>

            <Button onClick={() => handleManageSub(customerId)} size="lg">
              Manage Subscription
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
