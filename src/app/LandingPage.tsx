'use client'

import { DownloadOptions } from '@/components/DownloadOptions'
import { oneLiner } from '@/constants/brand'
import { PrdFormData } from '@/lib/schemas/prdSchemas'
import { DecodedIdToken } from 'next-firebase-auth-edge/auth'
import { useEffect } from 'react'
import Layout from '../components/Layout'
import { MyDialog } from '../components/my-dialog'
import { PrdForm } from '../components/PrdForm'
import { PrdOutput } from '../components/PrdOutput/PrdOutput'
import PricingSectionCards from '../components/PricingSectionCards'
import { UserAuthForm } from '../components/user-auth-form'
import { useStore } from '../lib/store'

interface Props {
  isAuth: boolean
  isPro: boolean
  user?: DecodedIdToken
  initialData?: PrdFormData
  output?: string
}

export default function LandingPage({ user, isAuth, isPro, initialData, output }: Props) {
  const userId = user?.uid

  const { set, showUpsellSheet, showAuthModal, showDownloadModal } = useStore(
    (state) => state.display
  )
  const { set: setPrd } = useStore((state) => state.prd)

  useEffect(() => {
    if (output) setPrd({ text: output })
  }, [])
  return (
    // This page is false because
    // Make the page not scrollable
    <Layout bodyClassName="mx-0 lg:overflow-hidden" user={user} className="h-screen" isPro={isPro}>
      {/* Main Content */}
      <main className="flex relative flex-col lg:flex-row">
        {/* left */}
        <div
          className="lg:flex-1 relative lg:block sm:px-5 lg:h-full h-auto overflow-y-auto"
          style={{
            height: 'calc(100vh - 64px)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-200 to-white pointer-events-none -z-10"></div>

          <PrdOutput isAuth={isAuth} isPro={isPro} />
        </div>

        {/* right */}
        <div
          className="lg:flex-1 mx-8 overflow-scroll px-4 py-8 lg:w-1/2 relative"
          style={{ height: 'calc(100vh - 64px)' }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{oneLiner}</h1>
          <p className="text-gray-500 mb-6">
            Provide key details to assist the bot in generating a strong starting point.
          </p>
          {/* <Button
            size="lg"
            className="p-4 font-mono font-bold flex-none rounded-lg flex items-center justify-center bg-gray-50 border border-gray-300 text-gray-600 hover:bg-gray-100 w-full mb-8 mt-16"
          >
            Try with a sample requirement
          </Button> */}

          <PrdForm isAuth={Boolean(user)} initialData={initialData} isPro={isPro} />
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

        <MyDialog
          open={showDownloadModal}
          setOpen={() => set({ showDownloadModal: !showDownloadModal })}
        >
          <DownloadOptions />
        </MyDialog>
      </main>
    </Layout>
  )
}
