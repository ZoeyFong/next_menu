import "@testing-library/jest-dom"
import * as React from "react"
import {
  render,
  fireEvent,
  screen,
  waitFor,
  cleanup,
} from "@testing-library/react"
import fetchMock from "jest-fetch-mock"
import Login from "./index"
import Page from "@/app/page"

describe("test single login component", () => {
  let passwordInput: HTMLInputElement, usernameInput: HTMLInputElement
  let submitBtn: HTMLButtonElement

  const setup = () => {
    const voidFn = jest.fn()
    render(<Login handleCloseLogin={voidFn} handleLoggedIn={voidFn} />)
    passwordInput = screen.getByPlaceholderText("Please enter your password")
    usernameInput = screen.getByPlaceholderText("Please enter your username")
    submitBtn = screen.getByText("Submit")
  }

  test("unable to click submit when username is empty", async () => {
    setup()
    fireEvent.change(passwordInput, {
      target: { value: "a" },
    })
    expect(submitBtn.disabled).toBe(true)
  })

  test("unable to click submit when password is empty", async () => {
    setup()
    fireEvent.change(usernameInput, {
      target: { value: "a" },
    })
    expect(submitBtn.disabled).toBe(true)
  })

  test("able to click submit when username and password are filled", async () => {
    setup()
    fireEvent.change(usernameInput, {
      target: { value: "invalid" },
    })
    fireEvent.change(passwordInput, {
      target: { value: "invalid" },
    })
    await waitFor(() => expect(submitBtn.disabled).toBe(false))
  })

  test("click submit and retrieve an error message", async () => {
    setup()
    fireEvent.change(usernameInput, {
      target: { value: "invalid" },
    })
    fireEvent.change(passwordInput, {
      target: { value: "invalid" },
    })

    fetchMock.mockResponse(() => Promise.reject("mock error"))
    await waitFor(() => expect(submitBtn.disabled).toBe(false))
    fireEvent.click(submitBtn)
    await screen.findByText("mock error")
    cleanup()
  })
})

describe("test login interactions in homepage", () => {
  test("click cancel to trigger handleCloseLogin", async () => {
    let closed = false
    const handleCloseLogin = () => {
      closed = true
    }
    const voidFn = jest.fn()
    render(
      <Login handleCloseLogin={handleCloseLogin} handleLoggedIn={voidFn} />
    )
    fireEvent.click(screen.getByText("Cancel"))
    expect(closed).toBe(true)
    cleanup()
  })

  test("click submit and login successfully", async () => {
    render(<Page />)
    fireEvent.click(screen.getByText("Sign in"))
    await waitFor(() => {
      expect(screen.getByTestId("login-form")).toBeInTheDocument()
    }).then(async () => {
      fireEvent.change(
        screen.getByPlaceholderText("Please enter your username"),
        {
          target: { value: "mock user" },
        }
      )
      fireEvent.change(
        screen.getByPlaceholderText("Please enter your password"),
        {
          target: { value: "mock password" },
        }
      )

      fetchMock.mockResponseOnce(
        JSON.stringify({ code: 200, message: "success" })
      )
      const submitBtn: HTMLButtonElement = screen.getByText("Submit")
      await waitFor(() => expect(submitBtn.disabled).toBe(false))
      fireEvent.click(submitBtn)
      await screen.findByText("Welcome, mock user")
      cleanup()
    })
  })
})
