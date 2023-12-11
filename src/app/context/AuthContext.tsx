"use client"

import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react"

type AuthState = {
  user: string
}

type AuthAction =
  | {
      type: "login"
      data: AuthState
    }
  | {
      type: "logout"
    }

const initialAuth = { user: "" }

const authReducer = (auth: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "login":
      return {
        ...auth,
        user: action.data.user,
      }

    case "logout": {
      return {
        user: "",
      }
    }
    default: {
      return auth
    }
  }
}

export const AuthContext = createContext<AuthState>(initialAuth)

export const useAuth = () => {
  const auth = useContext(AuthContext)
  return auth.user
}

export const AuthDispatchContext = createContext<Dispatch<AuthAction>>(() => {})

export const useAuthDispatch = () => {
  const dispatch = useContext(AuthDispatchContext)
  return dispatch
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, dispatch] = useReducer(authReducer, initialAuth)
  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  )
}
