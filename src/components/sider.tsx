"use client"

import { useCallback, useState } from "react"
import menuConfig from "@/app/menu.json"
import { useRouter } from "next/navigation"

type MenuKey = string

type Menu = {
  label: string
  key: MenuKey
  level: number
  children: Menu[]
}

type SiderProps = {
  loggedUser: null | string
  hanldeOpenLogin: () => void
}

export default function Sider({ loggedUser, hanldeOpenLogin }: SiderProps) {
  const router = useRouter()
  const [routePath, setRoutePath] = useState<string>("")

  const handleCommonClick = useCallback(
    (key: MenuKey) => {
      if (!loggedUser) {
        hanldeOpenLogin()
        return
      }
      setRoutePath(key)
      router.push(`#${key}`)
    },
    [loggedUser, hanldeOpenLogin]
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
          handleCommonClick={handleCommonClick}
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
  handleCommonClick: (key: MenuKey) => void
  isActiveRoute: (key: MenuKey) => boolean
}

const MenuItem = ({
  menu: { key, children, label, level },
  handleCommonClick,
  isActiveRoute,
}: MenuProps) => {
  const [toggled, setToggled] = useState<boolean>(level === 1)

  const handleClickMenu = useCallback(
    (key: MenuKey) => {
      handleCommonClick(key)
      setToggled((t) => !t)
    },
    [handleCommonClick]
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
        handleCommonClick={handleCommonClick}
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
        onClick={() => handleClickMenu(key)}
      >
        {getPrefix(toggled, children)}
        <div>{label}</div>
      </div>
      {renderChildren()}
    </div>
  )
}
