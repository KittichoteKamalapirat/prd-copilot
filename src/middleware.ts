import { NextRequest, NextResponse } from "next/server";
import {
  authMiddleware,
  redirectToHome,
  redirectToLogin,
  redirectToPath,
} from "next-firebase-auth-edge";
import { clientConfig, serverConfig } from "./firebase/auth/config";

const PUBLIC_PATHS = ["/", "/register", "/login", "/sentry-example-page"];
const AUTH_PATHS = ["/login", "/register"];
const APP_PATH = "/app";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: serverConfig.cookieSerializeOptions,
    serviceAccount: serverConfig.serviceAccount,
    handleValidToken: async ({}, headers) => {
      // If authenticated user tries to access auth pages, redirect to app
      if (AUTH_PATHS.includes(pathname)) {
        return redirectToPath(request, APP_PATH);
      }

      if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
        // return redirectToHome(request);
        redirectToPath(request, "/app");
      }

      return NextResponse.next({
        request: {
          headers,
        },
      });
    },
    handleInvalidToken: async (reason) => {
      console.info("Missing or malformed credentials", { reason });

      if (PUBLIC_PATHS.includes(pathname)) {
        return NextResponse.next();
      }

      // return redirectToLogin(request, {
      //   path: "/login",
      //   publicPaths: PUBLIC_PATHS,
      // });
      return redirectToHome(request, { path: "/" });
    },
    handleError: async (error) => {
      console.error("Unhandled authentication error", { error });

      return redirectToLogin(request, {
        path: "/login",
        publicPaths: PUBLIC_PATHS,
      });
    },
  });
}

export const config = {
  matcher: ["/", "/((?!_next|api|.*\\.).*)", "/api/login", "/api/logout"],
};
