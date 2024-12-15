import { ReactNode } from 'react'
import { cn } from '../lib/utils'
import Navbar from './Navbar'
import { DecodedIdToken } from 'next-firebase-auth-edge/auth'

interface LayoutProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode
  user?: DecodedIdToken
  isPro: boolean
  bodyClassName?: string
}

export default function Layout({
  isPro,
  user,
  children,
  className,
  bodyClassName = 'flex-1 container mx-auto',
  ...rest
}: LayoutProps) {
  return (
    <div className={cn('flex flex-col', className)} {...rest}>
      <Navbar user={user} isPro={isPro} />
      <main className={bodyClassName}>{children}</main>
    </div>
  )
}
