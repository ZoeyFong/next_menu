"use client"

import { ReactNode, forwardRef, useCallback, useEffect, useState } from "react"
import ArrowRight from "public/images/arrow-right.svg"
import { useAuth } from "@/app/context/AuthContext"

export type MenuKey = string

export type MenuHandler = {
  setToggled: (value: boolean) => void
}

type Menu = {
  label: string
  key: MenuKey
  children: Menu[]
}

type MenuProps = {
  menu: Menu
  handleCommonClick?: (key: MenuKey, open: boolean) => boolean // pre-requisites for clicking menu items
  isActiveRoute?: (key: MenuKey) => boolean // manage active route state in upper component
  defaultToggled?: boolean // set a group of menu toggled by default
  icon?: ReactNode // set a icon for toggling
  itemClassname?: string // extra classnames for menu items
  disabled?: boolean
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
  handleCommonClick,
  isActiveRoute,
  defaultToggled,
  disabled,
  ...props
}: MenuProps) => {
  const [toggled, setToggled] = useState(!!defaultToggled)
  const user = useAuth()

  const {
    icon = defaultRequiredMenuProps.icon,
    itemClassname = defaultRequiredMenuProps.itemClassname,
  } = props

  const handleClickMenu = useCallback(
    (key: MenuKey) => {
      const valid = handleCommonClick ? handleCommonClick(key, !toggled) : true
      if (valid) setToggled((t) => !t)
    },
    [handleCommonClick, toggled]
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
        handleCommonClick={handleCommonClick}
        menu={child}
        key={child.key}
        isActiveRoute={isActiveRoute}
        defaultToggled={defaultToggled}
        icon={icon}
        itemClassname={itemClassname}
        disabled={disabled}
      />
    ))
  }

  return (
    <div className="text-lg  ml-4 mr-2 space-y-3" key={key}>
      <div
        className={`flex justify-start w-fit hover:text-amber-500 hover:fill-amber-500 dark:fill-[#fff] ${
          isActiveRoute?.(key) ? "font-extrabold" : ""
        } ${
          disabled ? "pointer-events-none" : "cursor-pointer"
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
