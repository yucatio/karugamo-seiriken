import { FC, createContext, useState, useContext, useEffect } from "react"
import { onAuthStateChanged, User } from "firebase/auth"

import { auth } from "../firebase"

type AuthContextProps = {
  currentUser: User | null | undefined;
  authLoaded: boolean;
}

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined, authLoaded: false })

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthProvider: FC = ({ children }) => {
  const [authLoaded, setAuthLoaded] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoaded(true)
    })
    return () => {
      unsubscribed();
    }
  }, [])

  return <AuthContext.Provider value={{ currentUser, authLoaded }}>{children}</AuthContext.Provider>
}