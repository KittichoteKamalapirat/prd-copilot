import type * as firebase from 'firebase/auth'
import { Timestamp } from 'firebase/firestore'

export type FirebaseUser = Pick<firebase.User, 'uid'>

export type BaseUser = Pick<
  firebase.User,
  'uid' | 'displayName' | 'email' | 'photoURL' | 'providerId'
>

export interface FbUser extends Omit<BaseUser, 'displayName' | 'providerId' | 'photoURL'> {
  name: BaseUser['displayName']
  avatarUrl: BaseUser['photoURL']
  provider: BaseUser['providerId']
  timezone: string
  joinedDate: Timestamp

  // stripe
  subscription?: FbSubscription

  // extra
  isPro: boolean
}

export interface FbSubscription {
  customerId: string
  priceId: string
  expiresAt: Timestamp
  cents: number // store just for display in frontend purpose
  productId: string // store just for display in frontend purpose
  productName: string // store just for display in frontend purpose
}
