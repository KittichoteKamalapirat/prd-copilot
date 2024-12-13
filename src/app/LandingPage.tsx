'use client'

import { Button } from '@/components/ui/button'
import { oneLiner } from '@/constants/brand'
import Layout from '../components/Layout'
import { MyDialog } from '../components/my-dialog'
import { PrdForm } from '../components/PrdForm'
import { PrdOutput } from '../components/PrdOutput/PrdOutput'
import PricingSectionCards from '../components/PricingSectionCards'
import { StickyActionBar } from '../components/StickyActionBar'
import { UserAuthForm } from '../components/user-auth-form'
import { useAuthUser } from '../hooks/useAuthUser'
import { useStore } from '../lib/store'

interface Props {
  isAuth: boolean
  isPro: boolean
  userId?: string
}

export default function LandingPage({ userId, isAuth, isPro }: Props) {
  const { user } = useAuthUser()
  const { set, showUpsellSheet, showAuthModal } = useStore((state) => state.display)

  return (
    // This page is false because
    <Layout isAuth={isAuth} className="h-screen" isPro={isPro}>
      {/* Main Content */}
      <main className="flex relative sm:flex-col md:flex-col">
        {/* left */}
        <div
          className="overflow-scroll px-4 py-8 w-full lg:w-1/2 relative"
          style={{ height: 'calc(100vh - 64px)' }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{oneLiner}</h1>
          <p className="text-gray-500 mb-6">
            Provide key details to assist the bot in generating a strong starting point.
          </p>
          <Button
            size="lg"
            className="p-4 font-mono font-bold flex-none rounded-lg flex items-center justify-center bg-gray-50 border border-gray-300 text-gray-600 hover:bg-gray-100 w-full mb-8 mt-16"
          >
            Try with a sample requirement
          </Button>

          <PrdForm isAuth={Boolean(user)} />
        </div>
        {/* right */}

        <div
          className="relative lg:fixed right-0 bottom-0 lg:block lg:w-1/2 overflow-hidden sm:px-5 lg:h-full h-auto overflow-y-auto top-[64px]"
          style={{
            height: 'calc(100vh - 64px)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-pink-100 to-white pointer-events-none -z-10"></div>

          <PrdOutput isAuth={isAuth} isPro={isPro} />

          <StickyActionBar />
        </div>

        {userId && (
          <MyDialog
            open={showUpsellSheet}
            setOpen={() => set({ showUpsellSheet: !showUpsellSheet })}
          >
            <PricingSectionCards
              userId={userId}
              title="Become a better PM"
              description="Create a product requirement in a breeze"
            />
          </MyDialog>
        )}

        <MyDialog open={showAuthModal} setOpen={() => set({ showAuthModal: !showAuthModal })}>
          <UserAuthForm isRegister={true} />
        </MyDialog>
      </main>
    </Layout>
  )
}
