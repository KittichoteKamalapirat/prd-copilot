import { notFound } from 'next/navigation'

import { clientConfig, serverConfig } from '@/firebase/auth/config'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import PrdDetailPage from '../../../PrdDetailPage'

export default async function PRDDetailPage({ params }: { params: { id: string } }) {
  const tokens = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  })

  if (!tokens || !tokens.decodedToken) {
    notFound()
  }

  const userId = tokens.decodedToken.uid

  return <PrdDetailPage userId={userId} prdId={params.id} />
}
