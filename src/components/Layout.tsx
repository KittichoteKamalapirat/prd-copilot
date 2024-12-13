import { ReactNode } from 'react'
import { cn } from '../lib/utils'
import Navbar from './Navbar'

interface LayoutProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode
  isAuth: boolean
  isPro: boolean
}

export default function Layout({ isAuth, isPro, children, className, ...rest }: LayoutProps) {
  return (
    <div className={cn('flex flex-col', className)} {...rest}>
      <Navbar isAuth={isAuth} isPro={isPro} />
      <main className="flex-1 container mx-auto">{children}</main>
    </div>
  )
}
