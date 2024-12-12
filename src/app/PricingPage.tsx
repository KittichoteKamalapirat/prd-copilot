import Layout from '@/components/Layout'
import PricingSectionCards from '@/components/PricingSectionCards'

interface Props {
  userId?: string
}

export const PricingPage = ({ userId }: Props) => {
  return (
    //   TODO: fix isPro is false
    <Layout isAuth={Boolean(userId)} isPro={false}>
      <PricingSectionCards userId={userId} />
    </Layout>
  )
}
