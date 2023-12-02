"use client"

import { useCallback, useState } from "react"
import dynamic from "next/dynamic"
import Loading from "@/components/loading"
import Mask from "@/components/mask"
import Sidebar from "@/components/sidebar"

const Login = dynamic(() => import("../components/login"), {
  loading: () => <Loading />,
})

export default function Home() {
  const [loginIsVisible, setLoginVisible] = useState(false)
  const [loggedUser, setLoggedUser] = useState<null | string>(null)

  const handleCloseLogin = useCallback(() => {
    setLoginVisible(false)
  }, [])

  const handleOpenLogin = () => {
    setLoginVisible(true)
  }

  const handleLoggedIn = (user: string) => {
    setLoggedUser(user)
    handleCloseLogin()
  }

  return (
    <>
      <main className="min-h-screen w-full">
        <nav className="flex justify-between items-center px-4 py-6 shadow-md">
          <h1 className="font-extrabold text-3xl">Homepage</h1>
          {loggedUser ? (
            <div>Welcome, {loggedUser}</div>
          ) : (
            <button onClick={handleOpenLogin}>Sign in</button>
          )}
        </nav>
        <Sidebar loggedUser={loggedUser} handleOpenLogin={handleOpenLogin} />
      </main>
      {loginIsVisible && (
        <>
          <Mask />
          <Login
            handleCloseLogin={handleCloseLogin}
            handleLoggedIn={handleLoggedIn}
          />
        </>
      )}
    </>
  )
}
