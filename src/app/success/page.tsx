import { SuccessPage } from '@/app/SuccessPage'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { clientConfig, serverConfig } from '../../firebase/auth/config'

export default async function Page() {
  const tokens = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  })

  if (!tokens || !tokens.decodedToken) {
    notFound()
  }

  return <SuccessPage userId={tokens?.decodedToken.uid} />
}
