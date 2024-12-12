import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { clientConfig, serverConfig } from "../../firebase/auth/config";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xm7WBJ38gaa
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { SubscriptionPage } from "../SubscriptionPage";

export default async function Page() {
  const tokens = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (!tokens || !tokens.decodedToken) {
    notFound();
  }

  return (
    <SubscriptionPage
      email={tokens.decodedToken.email}
      userId={tokens.decodedToken.uid}
    />
  );
}
