// should be server component
// For pro only
import Layout from '../components/Layout'
import PRDList from '../components/PrdList'

interface HomePageProps {
  userId: string
  email: string
}

export default function PrdListingPage({ userId }: HomePageProps) {
  return (
    <Layout isAuth={Boolean(userId)} isPro>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">My PRDs</h1>
        <PRDList userId={userId} />
      </div>
    </Layout>
  )
}
