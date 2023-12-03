"use client"

import { useCallback, useState } from "react"
import menuConfig from "@/app/menu.json"
import MenuItem, { MenuKey } from "./MenuItem"

type SidebarProps = {
  loggedUser: null | string
  handleOpenLogin: () => void
}

export default function Sidebar({ loggedUser, handleOpenLogin }: SidebarProps) {
  const [routePath, setRoutePath] = useState<string>("")

  const commonClickPass = useCallback(
    (key: MenuKey) => {
      if (!loggedUser) {
        handleOpenLogin()
        return false
      }
      setRoutePath(key)
      return true
    },
    [loggedUser, handleOpenLogin]
  )

  const isActiveRoute = useCallback(
    (key: MenuKey) => {
      return routePath.startsWith(key)
    },
    [routePath]
  )

  return (
    <aside className="relative w-fit h-screen space-y-4 py-8 px-4 shadow-md">
      {menuConfig.children.map((menu) => (
        <MenuItem
          commonClickPass={commonClickPass}
          isActiveRoute={isActiveRoute}
          key={menu.key}
          menu={menu}
        />
      ))}
    </aside>
  )
}
