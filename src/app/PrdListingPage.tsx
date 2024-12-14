// should be server component
// For pro only
import { Suspense } from 'react'
import Layout from '../components/Layout'
import ProGatekeeper from '../components/PrdGatekeeper'
import PRDList from '../components/PrdList'
import { Spinner } from '../components/ui/spinner'

interface HomePageProps {
  userId: string
  email: string
}

export default function PrdListingPage({ userId }: HomePageProps) {
  return (
    <Layout isAuth={Boolean(userId)} isPro>
      <ProGatekeeper userId={userId}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">My PRDs</h1>
          <Suspense fallback={<Spinner />}>
            <PRDList userId={userId} />
          </Suspense>
        </div>
      </ProGatekeeper>
    </Layout>
  )
}
