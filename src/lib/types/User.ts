import type * as firebase from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export type FirebaseUser = Pick<firebase.User, "uid">;

export type BaseUser = Pick<
  firebase.User,
  "uid" | "displayName" | "email" | "photoURL" | "providerId"
>;

export interface FbUser
  extends Omit<BaseUser, "displayName" | "providerId" | "photoURL"> {
  name: BaseUser["displayName"];
  avatarUrl: BaseUser["photoURL"];
  provider: BaseUser["providerId"];
  timezone: string;
  joinedDate: Timestamp;
}
