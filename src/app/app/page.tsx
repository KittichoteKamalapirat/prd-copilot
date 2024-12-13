import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import HomePage from "../HomePage";
import { clientConfig, serverConfig } from "../../firebase/auth/config";

export default async function Home() {
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
    <HomePage
      userId={tokens?.decodedToken.uid}
      email={tokens?.decodedToken.email}
    />
  );
}
