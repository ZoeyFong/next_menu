"use client"

import { useState } from "react"
import Link from "next/link"
import menuConfig from "@/app/menu.json"

type TMenu = {
  label: string
  key: string
  level: number
  children: TMenu[]
}

type Props = {
  loggedUser: null | string
  hanldeOpenLogin: () => void
}

export default function Sider({
  loggedUser,
  hanldeOpenLogin,
}: Props): JSX.Element {
  const [togglePath, setTogglePath] = useState<string[]>([])

  const handleClickMenu = (key: TMenu["key"]) => {
    if (!loggedUser) {
      hanldeOpenLogin()
      return
    }

    const toggleLen = togglePath.length

    if (!toggleLen) {
      setTogglePath([key])
    } else {
      const existedIndex = togglePath.indexOf(key)
      if (existedIndex !== -1) {
        setTogglePath(togglePath.slice(0, existedIndex))
      } else {
        setTogglePath([...togglePath, key])
      }
    }
  }

  const isToggled = (key: TMenu["key"]) => togglePath.includes(key)

  return (
    <section className="relative w-fit h-screen space-y-4 py-8 px-4 shadow-md">
      <MenuItem
        handleClickMenu={handleClickMenu}
        menus={menuConfig.children}
        isToggled={isToggled}
      />
    </section>
  )
}

const MenuItem = ({
  menus,
  handleClickMenu,
  isToggled,
}: {
  menus: TMenu[]
  handleClickMenu: (key: TMenu["key"]) => void
  isToggled: (key: TMenu["key"]) => boolean
}) => {
  const getPrefix = (menu: TMenu) => {
    const { key, children } = menu
    if (!children.length) return null
    return <span> {isToggled(key) ? "<" : ">"}</span>
  }

  return (
    <>
      {menus.map((menu) => {
        const { key, label, children } = menu
        return (
          <div className="cursor-pointer ml-4 space-y-3" key={key}>
            <Link href={`#${key}`}>
              <span
                className="block hover:text-amber-500 active:font-bold"
                onClick={() => {
                  handleClickMenu(key)
                }}
              >
                {label} {getPrefix(menu)}
              </span>
            </Link>
            {isToggled(key) && !!children.length && (
              <MenuItem
                menus={children}
                handleClickMenu={handleClickMenu}
                isToggled={isToggled}
              />
            )}
          </div>
        )
      })}
    </>
  )
}
