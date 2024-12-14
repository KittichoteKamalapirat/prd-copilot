import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { clientConfig, serverConfig } from '../../../firebase/auth/config'
import PrdListingPage from '../../PrdListingPage'

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

  return <PrdListingPage userId={tokens.decodedToken.uid} email={tokens.decodedToken.email || ''} />
}
