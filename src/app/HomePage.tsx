'use client'

import { DecodedIdToken } from 'next-firebase-auth-edge/auth'
import { useSubIsPro } from '../hooks/useSubIsPro'
import LandingPage from './LandingPage'

interface HomePageProps {
  user: DecodedIdToken
}

export default function HomePage({ user }: HomePageProps) {
  const { isPro } = useSubIsPro({ userId: user.uid })
  return (
    <>
      <LandingPage isAuth isPro={isPro} user={user} />
    </>
  )
}
