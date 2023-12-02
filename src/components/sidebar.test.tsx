import "@testing-library/jest-dom"
import * as React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import Sidebar, { MenuItem } from "./sidebar"

describe("test sider", () => {
  test("shows the login form when a menu item is clicked", async () => {
    let triggered = false
    const handleOpenLogin = () => {
      triggered = true
    }
    render(<Sidebar loggedUser={null} handleOpenLogin={handleOpenLogin} />)

    const menuItems = screen.getAllByTestId("menu-item")
    const len = menuItems.length
    fireEvent.click(menuItems[Math.floor(Math.random() * len)])
    expect(triggered).toBe(true)
  })

  test("shows children when is toggled by default", async () => {
    const fakeMenu = {
      label: "node 1",
      key: "1",
      children: [
        {
          label: "node 1-1",
          key: "1-1",
          children: [],
        },
      ],
    }
    render(
      <MenuItem
        commonClickPass={() => true}
        isActiveRoute={() => false}
        menu={fakeMenu}
        defaultToggled
      />
    )
    expect(screen.getByText("node 1-1")).toBeInTheDocument()
  })

  test("not showing any child by default", async () => {
    const fakeMenu = {
      label: "node 1",
      key: "1",
      children: [
        {
          label: "node 1-1",
          key: "1-1",
          children: [],
        },
      ],
    }
    render(
      <MenuItem
        commonClickPass={() => true}
        isActiveRoute={() => false}
        menu={fakeMenu}
      />
    )
    expect(screen.queryByText("node 1-1")).not.toBeInTheDocument()
  })

  test("click to show its direct children", async () => {
    const fakeMenu = {
      label: "node 1",
      key: "1",
      children: [
        {
          label: "node 1-1",
          key: "1-1",
          children: [
            {
              label: "node 1-1-1",
              key: "1-1-1",
              children: [],
            },
          ],
        },
      ],
    }
    render(
      <MenuItem
        commonClickPass={() => true}
        isActiveRoute={() => false}
        menu={fakeMenu}
      />
    )
    expect(screen.queryByText("node 1-1")).not.toBeInTheDocument()
    fireEvent.click(screen.getByText("node 1"))
    expect(screen.getByText("node 1-1")).toBeInTheDocument()
    expect(screen.queryByText("node 1-1-1")).not.toBeInTheDocument()
  })
})
