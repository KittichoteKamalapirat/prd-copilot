// should be server component
// For pro only
import { Suspense } from 'react'
import Layout from '../components/Layout'
import ProGatekeeper from '../components/PrdGatekeeper'
import PRDList from '../components/PrdList'
import { Spinner } from '../components/ui/spinner'
import { DecodedIdToken } from 'next-firebase-auth-edge/auth'

interface Props {
  user: DecodedIdToken
}

export default function PrdListingPage({ user }: Props) {
  return (
    <Layout user={user} isPro>
      <ProGatekeeper user={user}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">My PRDs</h1>
          <Suspense fallback={<Spinner />}>
            <PRDList user={user} />
          </Suspense>
        </div>
      </ProGatekeeper>
    </Layout>
  )
}
