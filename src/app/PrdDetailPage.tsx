// should be server component
// For pro only
import { Suspense } from 'react'
import PrdDetail from '../components/PrdDetail'
import ProGatekeeper from '../components/PrdGatekeeper'
import { Spinner } from '../components/ui/spinner'
import { DecodedIdToken } from 'next-firebase-auth-edge/auth'

interface Props {
  user: DecodedIdToken
  prdId: string
}

export default function PrdDetailPage({ user, prdId }: Props) {
  return (
    <ProGatekeeper user={user}>
      <Suspense fallback={<Spinner />}>
        <PrdDetail user={user} prdId={prdId} />
      </Suspense>
    </ProGatekeeper>
  )
}
