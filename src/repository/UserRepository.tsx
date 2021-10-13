import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth"

import { auth } from "../firebase"

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  const credencial = await signInWithPopup(auth, provider)
  return credencial.user
}

export const logout = async () => {
  await signOut(auth)
}