'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { getAuth, signOut } from 'firebase/auth'
import { Gem, Layers, Loader, LogOut, MenuIcon } from 'lucide-react'
import { DecodedIdToken } from 'next-firebase-auth-edge/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import UserAvatarFallback from '../app/UserAvatarFallback'
import { brandName } from '../constants/brand'
import { app } from '../firebase/config'
import { urlResolver } from '../lib/urlResolver'

interface Props {
  user?: DecodedIdToken
  isPro: boolean
}

export default function Navbar({ user, isPro }: Props) {
  const isAuth = Boolean(user)
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  async function handleLogout(e: React.MouseEvent | Event) {
    e.stopPropagation()
    setIsLoggingOut(true)
    try {
      console.log('logging out')
      await signOut(getAuth(app))

      await fetch('/api/logout')

      router.push('/login')
    } catch (error) {
      console.error('Cannot log out', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="flex flex-col justify-between w-full bg-white dark:bg-gray-950 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <Link href={urlResolver.appHome} className="flex items-center" prefetch={false}>
          {/*<Image src="/logo.svg" alt="Logo" width={36} height={36} />*/}
          <span className="ml-2 font-semibold text-lg">{brandName}</span>
        </Link>
        <nav className="hidden md:flex md:items-center gap-6">
          {!isPro && (
            <Link
              href={urlResolver.pricing}
              className="text-sm font-medium hover:underline"
              prefetch={false}
            >
              Pricing
            </Link>
          )}

          {isPro && (
            <Link
              href={urlResolver.prds}
              className="text-sm font-medium flex items-center gap-1 hover:underline"
            >
              <Layers width={16} height={16} />
              My PRDs
            </Link>
          )}

          {isAuth ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {user?.picture ? (
                  <Image
                    src={user?.picture}
                    alt="User avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <UserAvatarFallback user={user} />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isPro && (
                  <DropdownMenuItem>
                    <Link href={urlResolver.subscription} className="w-full">
                      My Subscription
                    </Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem onSelect={handleLogout}>
                  {isLoggingOut ? <Loader /> : <LogOut />}
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href={urlResolver.login}
                className="text-sm font-medium hover:underline"
                prefetch={false}
              >
                Get started
              </Link>
            </>
          )}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          {/* Mobile Sheet */}
          <SheetContent side="left">
            <div className="flex flex-col items-start gap-6 mt-4">
              {isAuth ? (
                <>
                  <Card className="flex gap-2 items-center p-4 w-full">
                    <Avatar className="cursor-pointer h-8 w-8">
                      <AvatarImage src={user?.picture} alt="User avatar" />
                      <AvatarFallback>{user?.email?.[0]}</AvatarFallback>
                    </Avatar>
                  </Card>
                  {isPro && (
                    <Link
                      href={urlResolver.subscription}
                      className="flex items-center gap-1 text-sm font-medium hover:underline"
                      prefetch={false}
                    >
                      <Gem width={16} height={16} />
                      My Subscription
                    </Link>
                  )}

                  {isPro && (
                    <Link
                      href={urlResolver.prds}
                      className="flex items-center gap-1 text-sm font-medium hover:underline"
                      prefetch={false}
                    >
                      <Layers width={16} height={16} />
                      My PRDs
                    </Link>
                  )}

                  <Button
                    onClick={handleLogout}
                    variant="link"
                    size="lg"
                    className="w-full justify-start p-0"
                  >
                    {isLoggingOut ? <Loader /> : <LogOut />}
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href={urlResolver.login}
                    className="text-lg font-medium hover:underline"
                    prefetch={false}
                  >
                    Get started
                  </Link>
                </>
              )}

              {!isPro && (
                <Link
                  href={urlResolver.pricing}
                  className="text-lg font-medium hover:underline"
                  prefetch={false}
                >
                  Pricing
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
