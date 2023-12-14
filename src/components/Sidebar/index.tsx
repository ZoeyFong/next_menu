"use client"

import { useState } from "react"
import { MenuItem, type MenuKey } from "./MenuItem"
import menuConfig from "@/app/menu.json"
import Mask from "../Mask"
import dynamic from "next/dynamic"
import Loading from "../Loading"
import { useAuth } from "@/context/AuthContext"

const Login = dynamic(() => import("../Login"), {
  loading: () => <Loading />,
})

export default function Sidebar() {
  const auth = useAuth()
  const user = auth.username
  const [openLogin, setOpenLogin] = useState(false)
  const [routePath, setRoutePath] = useState<string>("")

  const commonClickPass = (key: MenuKey) => {
    if (!user) {
      setOpenLogin(true)
      return false
    }
    setRoutePath(key)
    return true
  }

  const isActiveRoute = (key: MenuKey) => {
    return routePath.startsWith(key)
  }

  return (
    <>
      {openLogin && (
        <>
          <Mask />
          <Login handleCloseLogin={() => setOpenLogin(false)} />
        </>
      )}
      <aside className="relative w-fit h-screen space-y-4 py-8 px-4 shadow-md">
        {menuConfig.children.map((menu) => (
          <MenuItem
            handleCommonClick={commonClickPass}
            isActiveRoute={isActiveRoute}
            disabled={openLogin}
            key={menu.key}
            menu={menu}
          />
        ))}
      </aside>
    </>
  )
}
