import "@testing-library/jest-dom"
import * as React from "react"
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import Page from "./page"

describe("test homepage", () => {
  const setup = () => render(<Page />)

  test("shows the login form when `Sign in` is clicked", async () => {
    setup()
    expect(screen.queryByText("Welcome")).toBeNull()
    fireEvent.click(screen.getByText("Sign in"))
    await waitFor(() => {
      expect(screen.getByTestId("login-form")).toBeInTheDocument()
    })
  })

  test("shows the login form when a menu item is clicked", async () => {
    setup()
    expect(screen.queryByText("Welcome")).toBeNull()
    fireEvent.click(screen.getByText("Sign in"))
    await waitFor(() => {
      expect(screen.getByTestId("login-form")).toBeInTheDocument()
    })
  })
})
