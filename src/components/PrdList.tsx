import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { initAdmin } from '../firebase/firebaseAdmin'
import { getFirestore } from 'firebase-admin/firestore'
import { DecodedIdToken } from 'next-firebase-auth-edge/auth'

type PRDType = 'SOLVE_PROBLEM' | 'CREATE_MVP' | 'ADD_FEATURE' | 'OTHERS'

interface PRD {
  id: string
  type: PRDType
  productName?: string
  featureName?: string
  problem?: string
  existingProduct?: string
}

async function getPRDs(userId: string): Promise<PRD[]> {
  await initAdmin()
  const firestore = getFirestore()
  const prdsRef = firestore.collection(`users/${userId}/prds`)
  const snapshot = await prdsRef.get()
  return snapshot.docs.map((doc) => doc.data() as PRD)
}

function getCardTitle(prd: PRD): string {
  switch (prd.type) {
    case 'SOLVE_PROBLEM':
      return prd.problem || 'Solve Problem'
    case 'CREATE_MVP':
      return prd.productName || 'Create MVP'
    case 'ADD_FEATURE':
      return prd.featureName || 'Add Feature'
    case 'OTHERS':
      return 'Other PRD'
    default:
      return 'PRD'
  }
}

export default async function PRDList({ user }: { user: DecodedIdToken }) {
  const prds = await getPRDs(user.uid)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {prds.map((prd) => (
        <Card key={prd.id}>
          <CardHeader>
            <CardTitle>{getCardTitle(prd)}</CardTitle>
            <CardDescription>
              <Badge>{prd.type.replace('_', ' ')}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {prd.type === 'ADD_FEATURE' && prd.existingProduct && (
              <p>Existing Product: {prd.existingProduct}</p>
            )}
            {/* Add more details as needed */}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
