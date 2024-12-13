// ref: https://www.youtube.com/watch?v=30ydBNgDsow
// give build error if import any client code import from this file
// used in webhooks so I can update firestore without auth token
import 'server-only'

import admin from 'firebase-admin'

interface FirebaseAdminAppParams {
  projectId: string
  clientEmail: string
  storageBucket: string
  privateKey: string
}

function formatPrivateKey(key: string) {
  return key.replace(/\\n/g, '\n')
}

export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
  const privateKey = formatPrivateKey(params.privateKey)

  if (admin.apps.length > 0) {
    return admin.app()
  }

  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey,
  })

  return admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
    storageBucket: params.storageBucket,
  })
}

export async function initAdmin() {
  const params = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL as string,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY as string,
  }

  return createFirebaseAdminApp(params)
}
