// should be server component
// For pro only
import { Suspense } from 'react'
import PrdDetail from '../components/PrdDetail'
import ProGatekeeper from '../components/PrdGatekeeper'
import { Spinner } from '../components/ui/spinner'

interface Props {
  userId: string
  prdId: string
}

export default function PrdDetailPage({ userId, prdId }: Props) {
  return (
    <ProGatekeeper userId={userId}>
      <Suspense fallback={<Spinner />}>
        <PrdDetail userId={userId} prdId={prdId} />
      </Suspense>
    </ProGatekeeper>
  )
}
