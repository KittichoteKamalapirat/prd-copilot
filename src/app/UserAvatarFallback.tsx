import { DecodedIdToken } from 'next-firebase-auth-edge/auth'

interface Props {
  user?: DecodedIdToken
}

export default function UserAvatarFallback({ user }: Props) {
  if (!user) return <></>
  return (
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
      {user?.email?.[0]?.toUpperCase()}
    </div>
  )
}
