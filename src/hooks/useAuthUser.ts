import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { getFirestoreUser } from "../firebase/firestore";
import { useStore } from "../lib/store";

// export const useAuthUser = () => {
//   return useSyncExternalStore(onAuthStateChanged, getCurrentUser, () => null)
// }

// also set firestore user to zustand
export const useAuthUser = () => {
  const { set: setUser } = useStore((state) => state.fbUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) {
          setUser({ user: null });
          setLoading(false);
          return;
        }

        const firestoreUser = await getFirestoreUser();

        if (firestoreUser) {
          setUser({ user: firestoreUser });
        } else {
          setUser({ user: null });
        }
      } catch (error) {
        console.error("Error in useAuthUser", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return { user: useStore((state) => state.fbUser.user), loading };
};

// import { useEffect, useState } from "react";
// import { onAuthStateChanged, User } from "firebase/auth";
// import { auth } from "../firebase/config";

// export const useAuthUser = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setLoading(false);
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   return { user, loading };
// };
