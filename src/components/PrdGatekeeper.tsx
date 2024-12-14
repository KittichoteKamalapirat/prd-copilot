'use client'

import { useSubIsPro } from '@/hooks/useSubIsPro'
import { ReactNode } from 'react'
import { Spinner } from './ui/spinner'
import ErrorTile from './ErrorTile'

interface ProGatekeeperProps {
  userId: string
  children: ReactNode
}

export default function ProGatekeeper({ userId, children }: ProGatekeeperProps) {
  const { isPro, loading } = useSubIsPro({ userId })

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
