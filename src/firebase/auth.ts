import {
  Timestamp,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
// please note that firebase auth adds about 30kb to your bundle size on Web
import {
  User as FirebaseAuthUser,
  GoogleAuthProvider,
  signInWithCredential,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// please note that firebase auth adds about 30kb to your bundle size on Web
import { auth, firestore } from "./config";
import { FbUser } from "../lib/types/User";

const googleProvider = new GoogleAuthProvider();

const createUserInFirestoreIfNotExist = async (
  user: FirebaseAuthUser,
): Promise<boolean> => {
  try {
    const { email, displayName, photoURL, uid, providerData } = user || {};
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const userRef = doc(firestore, "users", uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) return true;

    const newUser: FbUser = {
      uid,
      name: displayName || "",
      email,
      avatarUrl: photoURL,
      provider: providerData[0].providerId,
      timezone,
      joinedDate: serverTimestamp() as Timestamp,
    };
    await setDoc(userRef, newUser);
    return false;
  } catch (error) {
    console.error("error when signing in with Google", error);
    throw Error("Could not register");
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential) {
      throw new Error("Google credential is null");
    }

    const firebaseCredential = GoogleAuthProvider.credential(
      credential.idToken,
    );
    const firebaseUser = await signInWithCredential(auth, firebaseCredential);

    await createUserInFirestoreIfNotExist(firebaseUser.user);

    const firebaseIdToken = await firebaseUser.user.getIdToken();

    await fetch("/api/login", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${firebaseIdToken}`,
        "Content-Type": "application/json",
      },
    });

    return firebaseIdToken; // Return Firebase `idToken` for further use if needed
  } catch (error) {
    console.error("Error when signing in with Google", error);
    throw new Error("Could not log in");
  }
};

export const signInWithGithub = async () => {
  try {
    const githubProvider = new GithubAuthProvider();

    // Step 1: Sign in with GitHub
    const result = await signInWithPopup(auth, githubProvider);

    // Step 2: Retrieve GitHub credentials
    const credential = GithubAuthProvider.credentialFromResult(result);

    if (!credential || !credential.accessToken) {
      throw new Error("GitHub credential is null");
    }

    const firebaseCredential = GithubAuthProvider.credential(
      credential.accessToken,
    );

    const firebaseUser = await signInWithCredential(auth, firebaseCredential);

    // Step 4: Ensure user exists in Firestore
    await createUserInFirestoreIfNotExist(firebaseUser.user);

    // Step 5: Retrieve Firebase ID Token
    const firebaseIdToken = await firebaseUser.user.getIdToken();

    // Step 6: Send Firebase ID Token to backend
    await fetch("/api/login", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${firebaseIdToken}`,
        "Content-Type": "application/json",
      },
    });

    return firebaseIdToken; // Return Firebase `idToken` for further use if needed
  } catch (error) {
    console.error("Error when signing in with GitHub", error);
    throw new Error("Could not log in");
  }
};
