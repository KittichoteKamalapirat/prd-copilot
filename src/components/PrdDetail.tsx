import { getFirestore } from 'firebase-admin/firestore'
import { notFound } from 'next/navigation'
import LandingPage from '../app/LandingPage'
import { initAdmin } from '../firebase/firebaseAdmin'
import { FbPrd } from '../lib/types/FbPrd'

async function getPRD(userId: string, prdId: string): Promise<FbPrd | null> {
  await initAdmin()
  const firestore = getFirestore()
  const prdRef = firestore.collection('users').doc(userId).collection('prds').doc(prdId)
  const prdSnap = await prdRef.get()

  if (prdSnap.exists) {
    return prdSnap.data() as FbPrd
  }

  return null
}

export default async function PrdDetail({ userId, prdId }: { userId: string; prdId: string }) {
  const prd = await getPRD(userId, prdId)

  if (!prd) {
    notFound()
  }

  return <LandingPage isAuth isPro initialData={prd} output={prd.output} />
}
