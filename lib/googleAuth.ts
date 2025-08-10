// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
// import { useEffect } from "react";
// import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
// import { auth } from "@/lib/firebaseConfig";

// WebBrowser.maybeCompleteAuthSession();

// export function useGoogleSignIn() {
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     webClientId:
//       "793497013867-a4skv8eqrrntcus9rht3vostjju2ghdl.apps.googleusercontent.com",
//   });

//   useEffect(() => {
//     if (response?.type === "success") {
//       const { idToken } = response.authentication!;
//       const credential = GoogleAuthProvider.credential(idToken);
//       signInWithCredential(auth, credential)
//         .then((userCred) => {
//           console.log("Google Sign-in Success:", userCred.user.email);
//         })
//         .catch((err) => {
//           console.error("Google Sign-in Error:", err);
//         });
//     }
//   }, [response]);

//   return { promptAsync, request };
// }
