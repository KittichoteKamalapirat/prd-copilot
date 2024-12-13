import { doc, getDoc } from "firebase/firestore";
import { FbUser } from "../lib/types/User";
import { auth, firestore } from "./config";

export const getCurrentUser = () => auth.currentUser;
export const getFirestoreUser = async () => {
  const user = auth.currentUser;

  if (!user) throw new Error("User not logged in getFirestoreUser");

  try {
    const userDocRef = doc(firestore, "users", user.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) return userSnapshot.data() as FbUser;
    return null;
  } catch (error) {
    console.error("Error deleting account:", error);
    throw error;
  }
};
