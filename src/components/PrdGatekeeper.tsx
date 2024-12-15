'use client'

import { useSubIsPro } from '@/hooks/useSubIsPro'
import { ReactNode } from 'react'
import { Spinner } from './ui/spinner'
import ErrorTile from './ErrorTile'
import { DecodedIdToken } from 'next-firebase-auth-edge/auth'

interface ProGatekeeperProps {
  user: DecodedIdToken
  children: ReactNode
}

export default function ProGatekeeper({ user, children }: ProGatekeeperProps) {
  const { isPro, loading } = useSubIsPro({ userId: user.uid })

  if (loading) {
    return <Spinner />
  }

  if (!isPro) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ErrorTile title="Error" subtitle="You need a Pro subscription to access this content." />
      </div>
    )
  }

  return <>{children}</>
}
