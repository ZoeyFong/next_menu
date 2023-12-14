"use client"

import { useState } from "react"
import Mask from "../Mask"
import dynamic from "next/dynamic"
import Loading from "../Loading"
import { useAuth, useAuthDispatch } from "@/context/AuthContext"

const Login = dynamic(() => import("../Login"), {
  loading: () => <Loading />,
})

export default function Nav() {
  const auth = useAuth()
  const user = auth.username
  const [openLogin, setOpenLogin] = useState(false)
  const authDispatch = useAuthDispatch()

  return (
    <>
      <nav className="flex justify-between items-center px-4 py-6 shadow-md">
        <h1 className="font-extrabold text-3xl">Homepage</h1>
        {user ? (
          <div>
            Welcome {user}.{" "}
            <button onClick={() => authDispatch({ type: "logout" })}>
              Logout
            </button>
          </div>
        ) : (
          <button onClick={() => setOpenLogin(true)}>Sign in</button>
        )}
      </nav>
      {openLogin && (
        <>
          <Mask />
          <Login handleCloseLogin={() => setOpenLogin(false)} />
        </>
      )}
    </>
  )
}
