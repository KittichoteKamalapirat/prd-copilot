import { PricingPage } from '@/app/PricingPage'
import { clientConfig, serverConfig } from '@/firebase/auth/config'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'

export default async function Page() {
  const tokens = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  })

  const user = tokens?.decodedToken

  return <PricingPage user={user} />
}
