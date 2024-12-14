'use client'

import { cn } from '@/lib/utils'
import { Lock } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useStore } from '../../lib/store'
import { ActionBar } from '../ActionBar'
import { Button } from '../ui/button'
import './PrdOutput.css'

interface Props {
  isAuth?: boolean
  isPro?: boolean
}

const placeHolder = `Hi, I am PRD Copilot, your PRD writing assistant. Tell me what
            you want, and I will help you scaffold your PRD. 🚀`

const blockLabel = 'Subscribe to view ' // Actual action could be login or subscribe
export const PrdOutput = ({ isAuth, isPro }: Props) => {
  const { text, isBlurred } = useStore((state) => state.prd)

  const { set } = useStore((state) => state.display)

  const handleInvalidUser = () => {
    if (!isAuth) {
      set({ showAuthModal: true })
      return
    }
    if (!isPro) set({ showUpsellSheet: true })
  }
  return (
    <div className="form-textarea relative w-full p-4 px-8 overflow-scroll h-[calc(100%-1rem)] shadow-2xl flex items-center justify-center flex-col select-none">
      <div className="text-left absolute top-4 left-4">
        <div className={cn('is-typed', isBlurred && 'blurred')}>
          <ReactMarkdown>{text || placeHolder}</ReactMarkdown>
        </div>
      </div>

      {text && !isPro && (
        <div className="sticky left-1/2 -translate-x-1/2 top-1/2">
          <Button onClick={handleInvalidUser} size="lg" className="">
            <Lock />
            {blockLabel}
          </Button>
        </div>
      )}

      <ActionBar className="sticky top-[90%] w-full mt-auto mx-4 px-2 py-2 font-semibold text-sm text-slate-900 bg-slate-50/90 backdrop-blur-sm ring-1 ring-slate-900/10 space-x-4 rounded-xl shadow-2xl my-6 h-auto min-h-[5rem] sm:min-h-[1rem]" />
    </div>
  )
}
