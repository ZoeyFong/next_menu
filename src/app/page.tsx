"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import Loading from "@/components/loading"
import Mask from "@/components/mask"
import Sider from "@/components/sider"

const Login = dynamic(() => import("../components/login"), {
  loading: () => <Loading />,
})

export default function Home() {
  const [loginIsVisible, setLoginVisible] = useState(false)
  const [loggedUser, setLoggedUser] = useState<null | string>(null)

  const hanldeCloseLogin = () => {
    setLoginVisible(false)
  }

  const hanldeOpenLogin = () => {
    setLoginVisible(true)
  }

  const handleLoggedIn = (user: string) => {
    setLoggedUser(user)
    hanldeCloseLogin()
  }

  return (
    <>
      <main className="min-h-screen w-full">
        <nav className="flex justify-between items-center px-4 py-6 shadow-md">
          <h1 className="font-extrabold text-3xl">Homepage</h1>
          {loggedUser ? (
            <div>Welcome, {loggedUser}</div>
          ) : (
            <button onClick={hanldeOpenLogin}>Sign in</button>
          )}
        </nav>
        <Sider loggedUser={loggedUser} hanldeOpenLogin={hanldeOpenLogin} />
      </main>
      {loginIsVisible && (
        <>
          <Mask />
          <Login
            hanldeCloseLogin={hanldeCloseLogin}
            handleLoggedIn={handleLoggedIn}
          />
        </>
      )}
    </>
  )
}
