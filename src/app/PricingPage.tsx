import Layout from '@/components/Layout'
import PricingSectionCards from '@/components/PricingSectionCards'
import { DecodedIdToken } from 'next-firebase-auth-edge/auth'

interface Props {
  user?: DecodedIdToken
}

export const PricingPage = ({ user }: Props) => {
  return (
    //   TODO: fix isPro is false
    <Layout user={user} isPro={false}>
      <PricingSectionCards userId={user?.uid} />
    </Layout>
  )
}
