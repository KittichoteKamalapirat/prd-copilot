import { notFound } from 'next/navigation'

import { clientConfig, serverConfig } from '@/firebase/auth/config'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import PrdDetailPage from '../../../PrdDetailPage'

type Params = Promise<{ id: string }> // ref: https://stackoverflow.com/questions/79113322/nextjs-react-type-does-not-satisfy-constraint

export default async function PRDDetailPage(props: { params: Params }) {
  const params = await props.params
  const prdId = params.id

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

  return <PrdDetailPage userId={userId} prdId={prdId} />
}
