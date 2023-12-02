"use client"

import { useCallback, useState } from "react"
import menuConfig from "@/app/menu.json"

type MenuKey = string

type Menu = {
  label: string
  key: MenuKey
  children: Menu[]
}

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
    <section className="relative w-fit h-screen space-y-4 py-8 px-4 shadow-md">
      {menuConfig.children.map((menu) => (
        <MenuItem
          commonClickPass={commonClickPass}
          isActiveRoute={isActiveRoute}
          key={menu.key}
          menu={menu}
        />
      ))}
    </section>
  )
}

type MenuProps = {
  menu: Menu
  commonClickPass: (key: MenuKey) => boolean
  isActiveRoute: (key: MenuKey) => boolean
  defaultToggled?: boolean
}

export const MenuItem = ({
  menu: { key, children, label },
  commonClickPass,
  isActiveRoute,
  defaultToggled,
}: MenuProps) => {
  const [toggled, setToggled] = useState(!!defaultToggled)

  const handleClickMenu = useCallback(
    (key: MenuKey) => {
      const valid = commonClickPass(key)
      if (valid) setToggled((t) => !t)
    },
    [commonClickPass]
  )

  const getPrefix = (isActive: boolean, children: Menu[]) => {
    return (
      <div className="w-6">
        {!children.length ? null : (
          <span
            className={`inline-block transform transition opacity-40 ${
              isActive ? "rotate-90 bold" : ""
            }`}
          >
            {">"}
          </span>
        )}
      </div>
    )
  }

  const renderChildren = () => {
    if (!toggled || !children.length) return null
    return children.map((child) => (
      <MenuItem
        commonClickPass={commonClickPass}
        menu={child}
        key={child.key}
        isActiveRoute={isActiveRoute}
      />
    ))
  }

  return (
    <div className="text-lg cursor-pointer ml-4 mr-2 space-y-3" key={key}>
      <div
        className={`flex justify-start w-fit hover:text-amber-500 ${
          isActiveRoute(key) ? "font-extrabold" : ""
        }`}
        data-testid="menu-item"
        onClick={() => handleClickMenu(key)}
      >
        {getPrefix(toggled, children)}
        <div>{label}</div>
      </div>
      {renderChildren()}
    </div>
  )
}
