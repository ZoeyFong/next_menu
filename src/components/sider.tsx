"use client"

import { useEffect, useState } from "react"
import menuConfig from "@/app/menu.json"
import { useRouter } from "next/navigation"

type TKey = string

type TMenu = {
  label: string
  key: TKey
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
  const [togglePath, setTogglePath] = useState<Record<string, string[]>>({})
  const [routePath, setRoutePath] = useState<string>("")
  const router = useRouter()

  const handleClickMenu = (key: TKey) => {
    if (!loggedUser) {
      hanldeOpenLogin()
      return
    }
    router.push(`#${key}`)

    const subKey = key.split("-")[0]
    const toggleSub = togglePath[subKey] ?? []
    const existedIndex = toggleSub.indexOf(key)
		
    if (existedIndex !== -1) {
      setTogglePath({
        ...togglePath,
        [subKey]: toggleSub.slice(0, existedIndex),
      })
    } else {
      setTogglePath({ ...togglePath, [subKey]: [...toggleSub, key] })
    }
    setRoutePath(key)
  }

  const isToggled = (key: TKey) => {
    const subKey = key.split("-")[0]
    const toggleSub = togglePath[subKey] ?? []
    return toggleSub.indexOf(key) !== -1
  }

  const isClicked = (key: TKey) => routePath.startsWith(key)

  return (
    <section className="relative w-fit h-screen space-y-4 py-8 px-4 shadow-md">
      <MenuItem
        handleClickMenu={handleClickMenu}
        menus={menuConfig.children}
        isToggled={isToggled}
        isClicked={isClicked}
      />
    </section>
  )
}

const MenuItem = (props: {
  menus: TMenu[]
  handleClickMenu: (key: TKey) => void
  isToggled: (key: TKey) => boolean
  isClicked: (key: TKey) => boolean
}) => {
  const { menus, handleClickMenu, isToggled, isClicked } = props

  const getPrefix = (isActive: boolean, children: TMenu[]) => {
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

  return (
    <>
      {menus.map((menu) => {
        const { key, label, children } = menu
        const toggled = isToggled(key)
        return (
          <div className="text-lg cursor-pointer ml-4 mr-2 space-y-3" key={key}>
            <div
              className={`flex justify-start w-fit hover:text-amber-500 ${
                isClicked(key) ? "font-extrabold" : ""
              }`}
              onClick={() => {
                handleClickMenu(key)
              }}
            >
              {getPrefix(toggled, children)}
              <div>{label}</div>
            </div>
            {toggled && !!children.length && (
              <MenuItem {...props} menus={children} />
            )}
          </div>
        )
      })}
    </>
  )
}
