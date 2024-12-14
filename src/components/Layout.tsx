import { ReactNode } from 'react'
import { cn } from '../lib/utils'
import Navbar from './Navbar'

interface LayoutProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode
  isAuth: boolean
  isPro: boolean
  bodyClassName?: string
}

export default function Layout({
  isAuth,
  isPro,
  children,
  className,
  bodyClassName = 'flex-1 container mx-auto',
  ...rest
}: LayoutProps) {
  return (
    <div className={cn('flex flex-col', className)} {...rest}>
      <Navbar isAuth={isAuth} isPro={isPro} />
      <main className={bodyClassName}>{children}</main>
    </div>
  )
}
