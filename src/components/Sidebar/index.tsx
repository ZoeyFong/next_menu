"use client"

import { useCallback, useState } from "react"
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
  const user = useAuth()
  const [openLogin, setOpenLogin] = useState(false)
  const [routePath, setRoutePath] = useState<string>("")

  const commonClickPass = useCallback(
    (key: MenuKey) => {
      if (!user) {
        setOpenLogin(true)
        return false
      }
      setRoutePath(key)
      return true
    },
    [user]
  )

  const isActiveRoute = useCallback(
    (key: MenuKey) => {
      return routePath.startsWith(key)
    },
    [routePath]
  )

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
