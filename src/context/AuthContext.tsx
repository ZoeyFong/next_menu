"use client"

import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react"

type Auth = {
  username: string
}

const initialAuth = {
  username: "",
}

type AuthDispatch =
  | {
      type: "login"
      payload: Auth
    }
  | {
      type: "logout"
    }

export const AuthContext = createContext<Auth>(initialAuth)

export const AuthDispatchContext = createContext<Dispatch<AuthDispatch>>(
  () => {}
)

export const useAuthDispatch = () => {
  const useAuthDispatch = useContext(AuthDispatchContext)
  return useAuthDispatch
}

export const useAuth = () => {
  const auth = useContext(AuthContext)
  return auth
}

const authReducer = (state: Auth, action: AuthDispatch) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        ...action.payload,
      }
    case "logout":
      return {
        username: "",
      }

    default:
      return state
  }
}

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const [state, dispatch] = useReducer(authReducer, initialAuth)

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  )
}
