"use client"

import { ReactNode, useCallback, useState } from "react"
import menuConfig from "@/app/menu.json"
import ArrowRight from "public/images/arrow-right.svg"

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

type MenuProps = {
  menu: Menu
  commonClickPass?: (key: MenuKey) => boolean // pre-requisites for clicking menu items
  isActiveRoute?: (key: MenuKey) => boolean // manage active route state in upper component
  defaultToggled?: boolean // set a group of menu toggled by default
  icon?: ReactNode // set a icon for toggling
  itemClassname?: string // extra classnames for menu items
  /**
   * @see reusable
   * other possible properties to exposed in menu
   * e.g. direction, setToggled, onClickCallback, ...
   * but we always have to balance the maintainability with flexibility
   */
}

const defaultRequiredMenuProps: Pick<MenuProps, "icon" | "itemClassname"> = {
  icon: <ArrowRight />,
  itemClassname: "",
}

export const MenuItem = ({
  menu: { key, children, label },
  commonClickPass,
  isActiveRoute,
  defaultToggled,
  ...props
}: MenuProps) => {
  const [toggled, setToggled] = useState(!!defaultToggled)
  const {
    icon = defaultRequiredMenuProps.icon,
    itemClassname = defaultRequiredMenuProps.itemClassname,
  } = props

  const handleClickMenu = useCallback(
    (key: MenuKey) => {
      const valid = commonClickPass ? commonClickPass(key) : true
      if (valid) setToggled((t) => !t)
    },
    [commonClickPass]
  )

  const getPrefix = () => {
    return (
      <div className="w-6">
        {!children.length ? null : (
          <span
            className={`inline-block transform transition-transform ${
              toggled ? "rotate-90" : ""
            }`}
          >
            {icon}
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
        defaultToggled={defaultToggled}
        icon={icon}
        itemClassname={itemClassname}
      />
    ))
  }

  return (
    <div className="text-lg cursor-pointer ml-4 mr-2 space-y-3" key={key}>
      <div
        className={`flex justify-start w-fit hover:text-amber-500 hover:fill-amber-500 ${
          isActiveRoute?.(key) ? "font-extrabold" : ""
        } ${itemClassname}`}
        data-testid="menu-item"
        onClick={() => handleClickMenu(key)}
      >
        {getPrefix()}
        <div>{label}</div>
      </div>
      {renderChildren()}
    </div>
  )
}
