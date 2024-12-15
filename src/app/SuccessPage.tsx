'use client'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useSubIsPro } from '@/hooks/useSubIsPro'
import { urlResolver } from '@/lib/urlResolver'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface Props {
  userId: string
}

export const SuccessPage = ({ userId }: Props) => {
  const router = useRouter()
  const { loading, isPro } = useSubIsPro({ userId })

  useEffect(() => {
    if (isPro) {
      router.push(urlResolver.appHome)
    }
  }, [isPro, router])
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 text-4xl font-bold">Payment Successful!</h1>

        <p className="mb-8 text-gray-600">Thank you for your purchase.</p>
        {loading ? (
          <div className="flex flex-col gap-2 items-center">
            <p className="text-2xl font-bold">You will be redirected soon</p>
            <Spinner />
          </div>
        ) : (
          <Link href={urlResolver.appHome}>
            <Button>Return to Home</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
