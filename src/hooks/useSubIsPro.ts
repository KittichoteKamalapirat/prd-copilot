import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firestore } from '../firebase/config'
import { FbUser } from '../lib/types/User'

interface Props {
  userId: string
}

export const useSubIsPro = ({ userId }: Props) => {
  const [isPro, setIsPro] = useState<boolean>(false)
  const [user, setUser] = useState<FbUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userDocRef = doc(firestore, 'users', userId)

    const unsubscribe = onSnapshot(
      userDocRef,
      (doc) => {
        if (doc.exists()) {
          const userData = doc.data() as FbUser
          const now = new Date()
          const expiresAt = userData?.subscription?.expiresAt.toDate()
          setIsPro(Boolean(expiresAt && expiresAt > now))
          setUser(userData)
        } else {
          setIsPro(false)
        }
        setLoading(false)
      },
      (error) => {
        console.error('Error checking isPro status:', error)
        setIsPro(false)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [userId])

  return { user, isPro, loading }
}
