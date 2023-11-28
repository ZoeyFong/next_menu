"use client"

import { ReactNode, useMemo, useState } from "react"
import dynamic from "next/dynamic"
import Loading from "@/components/loading"
import Mask from "@/components/mask"
import menuConfig from "./menu.json"
import Link from "next/link"

const Login = dynamic(() => import("../components/login"), {
  loading: () => <Loading />,
})

type TMenu = {
  label: string
  key: string
  level: number
  children: TMenu[]
}

export default function Home() {
  const [loginIsVisible, setLoginVisible] = useState(false)
  const [loggedUser, setLoggedUser] = useState<null | string>(null)

  const hanldeCloseLogin = () => {
    setLoginVisible(false)
  }

  const handleLoggedIn = (user: string) => {
    setLoggedUser(user)
    hanldeCloseLogin()
  }

  const renderMenu = (menus: TMenu[]): ReactNode[] => {
    return menus.map((menu) => {
      const { key, label, children } = menu
      return (
        <div className="cursor-pointer ml-4 space-y-3" key={key}>
          <Link href={`#${key}`}>
            <span
              className="block hover:text-amber-500 active:font-bold"
              onClick={handleClickMenu}
            >
              {label}
            </span>
          </Link>
          {!!children.length && renderMenu(children)}
        </div>
      )
    })
  }

  const handleClickMenu = () => {
    if (!loggedUser) {
      setLoginVisible(true)
    }
  }

  return (
    <main className="min-h-screen w-full">
      <nav className="flex justify-between items-center px-4 py-6 shadow-md">
        <h1 className="font-extrabold text-3xl">Homepage</h1>
        {loggedUser && <div>Welcome, {loggedUser}</div>}
      </nav>
      <section className="relative w-fit h-screen space-y-4 py-8 px-4 shadow-md">
        {renderMenu(menuConfig.children)}
      </section>
      {loginIsVisible && (
        <>
          <Mask />
          <Login
            hanldeCloseLogin={hanldeCloseLogin}
            handleLoggedIn={handleLoggedIn}
          />
        </>
      )}
    </main>
  )
}
