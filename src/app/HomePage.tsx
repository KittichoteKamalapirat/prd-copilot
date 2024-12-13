'use client'

import { useSubIsPro } from '../hooks/useSubIsPro'
import LandingPage from './LandingPage'

interface HomePageProps {
  userId: string
  email?: string
}

export default function HomePage({ userId }: HomePageProps) {
  const { isPro } = useSubIsPro({ userId })
  return (
    <>
      <LandingPage isAuth isPro={isPro} />
    </>
  )
}
