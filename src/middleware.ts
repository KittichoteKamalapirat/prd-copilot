import { authMiddleware, redirectToLogin, redirectToPath } from 'next-firebase-auth-edge'
import { NextRequest, NextResponse } from 'next/server'
import { clientConfig, serverConfig } from './firebase/auth/config'
import { urlResolver } from './lib/urlResolver'

// Both auth and unauth users can access these pages

const UNAUTH_ONLY_PATHS = [urlResolver.landingRoot, urlResolver.login, urlResolver.register]
const AUTH_ONLY_PATHS = [
  urlResolver.appHome,
  urlResolver.subscription,
  urlResolver.success,
  urlResolver.cancel,
]
const PUBLIC_PATHS = [urlResolver.pricing, '/sentry-example-page']
const APP_PATH = urlResolver.appHome

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  return authMiddleware(request, {
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: serverConfig.cookieSerializeOptions,
    serviceAccount: serverConfig.serviceAccount,
    // prevent valid users from accessing UNAUTH_ONLY_PATHS pages
    handleValidToken: async ({}, headers) => {
      // If authenticated user tries to access auth pages, redirect to app
      if (UNAUTH_ONLY_PATHS.includes(pathname)) {
        return redirectToPath(request, APP_PATH)
      }

      return NextResponse.next({
        request: {
          headers,
        },
      })
    },
    // prevent unauth users from accessing AUTH_ONLY_PATHS pages
    handleInvalidToken: async (reason) => {
      console.info('Missing or malformed credentials', { reason })

      if (AUTH_ONLY_PATHS.includes(pathname)) {
        return redirectToLogin(request, { path: urlResolver.login, publicPaths: PUBLIC_PATHS })
      }

      return NextResponse.next()

      // return redirectToHome(request, { path: urlResolver.landingRoot })
    },
    handleError: async (error) => {
      console.error('Unhandled authentication error', { error })

      return redirectToLogin(request, {
        path: '/login',
        publicPaths: PUBLIC_PATHS,
      })
    },
  })
}

export const config = {
  matcher: ['/', '/((?!_next|api|.*\\.).*)', '/api/login', '/api/logout'],
}
