## Why Your Original Solution Didn't Work

```ts
export const signInWithGoogle = async () => {
  try {
    console.log("clicked");
    const result = await signInWithPopup(auth, googleProvider);

    const credential = GoogleAuthProvider.credentialFromResult(result);

    await createUserInFirestoreIfNotExist(result.user);

    return credential;
  } catch (error) {
    console.error("error when signing in with Google", error);
    throw Error("Could not login");
  }
};
```

```ts
export const signInWithGoogle = async () => {
  try {
    console.log("clicked");

    // Open the Google Sign-In popup
    const result = await signInWithPopup(auth, googleProvider);

    // Retrieve the Google credential
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential) {
      throw new Error("Google credential is null");
    }

    // Exchange Google `idToken` for Firebase `idToken`
    const firebaseCredential = GoogleAuthProvider.credential(
      credential.idToken,
    );
    const firebaseUser = await signInWithCredential(auth, firebaseCredential);

    // Ensure user exists in Firestore
    await createUserInFirestoreIfNotExist(firebaseUser.user);

    // Retrieve Firebase `idToken` for backend use
    const firebaseIdToken = await firebaseUser.user.getIdToken();

    // Send the Firebase `idToken` to your backend for setting secure cookies
    await fetch("/api/login", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${firebaseIdToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("User signed in with Google successfully");
    return firebaseIdToken; // Return Firebase `idToken` for further use if needed
  } catch (error) {
    console.error("Error when signing in with Google", error);
    throw new Error("Could not log in");
  }
};
```

Google vs. Firebase idToken:

Your original implementation retrieved the credential using GoogleAuthProvider.credentialFromResult(result).
This credential includes the Google idToken, which is valid for accessing Google APIs but not valid for Firebase authentication middleware.
The Google idToken issuer (iss) is accounts.google.com, but Firebase expects tokens with the issuer https://securetoken.google.com/{project-id}.
Missing Exchange Step:

Firebase requires the Google idToken to be exchanged for a Firebase idToken using its authentication system.
Without this exchange, the middleware cannot verify the token, resulting in the error: Invalid argument: idToken has incorrect "iss" (issuer) claim.
Middleware Expectations:

The middleware (next-firebase-auth-edge) expects a Firebase-compatible idToken to validate and set secure cookies.
Your original code passed the Google idToken directly to the middleware, which it couldn’t process.

## Why the Updated Solution Works

Token Exchange with signInWithCredential:

The updated solution uses signInWithCredential(auth, firebaseCredential) to exchange the Google idToken for a Firebase idToken.
This step ensures the returned token has the correct issuer (https://securetoken.google.com/{project-id}), which the Firebase system and middleware recognize.
Firebase-Compatible idToken:

The signInWithCredential method internally validates the Google token and issues a Firebase idToken tied to your Firebase project.
This token is compatible with Firebase's backend services and middleware.
Correct Flow for Secure Cookies:

The Firebase idToken is sent to /api/login, where the middleware processes it, validates the token, and sets secure cookies for authentication.
This aligns with the middleware’s expectations and avoids the Invalid argument error.

## Key Differences Between Your Original and Updated Solutions

| **Aspect**                   | **Original Solution**                                 | **Updated Solution**                                          |
| ---------------------------- | ----------------------------------------------------- | ------------------------------------------------------------- |
| **Token Type**               | Used Google `idToken` (`accounts.google.com` issuer). | Uses Firebase `idToken` (`securetoken.google.com` issuer).    |
| **Token Source**             | Directly retrieved from Google Sign-In.               | Exchanged via `signInWithCredential`.                         |
| **Middleware Compatibility** | Incompatible; invalid `iss` claim.                    | Compatible; valid `iss` claim for Firebase middleware.        |
| **Secure Cookies**           | Middleware fails to set cookies.                      | Middleware successfully sets cookies with Firebase `idToken`. |

ref: https://hackernoon.com/using-firebase-authentication-with-the-latest-nextjs-features

```
Last but not least, we need to generate service account credentials. Those will allow your app to gain full access to your Firebase services. Go to Project Settings > Service accounts and click Generate new private key. This will download a .json file with service account credentials. Save this file in a known location.
```

Enable Github

- Creat a new OAuth app on github at https://github.com/settings/applications/new
