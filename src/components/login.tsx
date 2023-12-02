"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { debounce } from "@/utils/debounce"

type Props = {
  hanldeCloseLogin: () => void
  handleLoggedIn: (user: string) => void
}

export default function Login({ hanldeCloseLogin, handleLoggedIn }: Props) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const loginDisabled = !password || !username

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault()

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code !== 200) throw data.message
        handleLoggedIn(username)
      })
      .catch((err) => setError(err))
  }

  const onChangeFormUsername = debounce((e: ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value)
  )

  const onChangeFormPassword = debounce((e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)
  )

  useEffect(() => {
    const escLister = (e: KeyboardEvent) => {
      if (e.key === "Escape") hanldeCloseLogin()
    }
    document.addEventListener("keydown", escLister)
    return () => {
      document.removeEventListener("keydown", escLister)
    }
  }, [hanldeCloseLogin])

  const formFields = [
    {
      value: "username",
      label: "Username",
      onChange: onChangeFormUsername,
      type: "text",
    },
    {
      value: "password",
      label: "Password",
      onChange: onChangeFormPassword,
      type: "password",
    },
  ]

  return (
    <div className="z-2 absolute top-[20%] rounded-md shadow-md w-[90%] left-[5%] sm:w-[50%] sm:left-[25%] lg:w-[30%] lg:left-[35%] p-6 bg-slate-50 dark:bg-slate-800">
      <form onSubmit={onSubmitForm} data-testid="login-form">
        <div className="space-y-6">
          {formFields.map(({ value, label, onChange, type }) => (
            <div className="space-y-3" key={value}>
              <label
                htmlFor={value}
                className="font-bold block leading-6 text-gray-900 dark:text-gray-400"
              >
                {label}
              </label>
              <input
                className="relative rounded-md shadow-sm w-full border-0 py-2 px-4 text-gray-900 text-sm"
                placeholder={`Please enter your ${value}`}
                type={type}
                name={value}
                onChange={onChange}
              />
            </div>
          ))}
        </div>
        <div className="text-red-500 h-[50px] leading-[50px]">{error}</div>
        <hr className="text-slate-50 dark:text-slate-800 mb-8 opacity-50" />
        <div className="mt-6 flex-col font-bold space-y-5 text-center">
          <button
            type="submit"
            disabled={loginDisabled}
            className="w-full rounded-md px-8 py-2 border-[1px] bg-slate-800 dark:bg-slate-50 text-slate-50 dark:text-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:dark:bg-slate-300"
          >
            Submit
          </button>
          <button
            onClick={hanldeCloseLogin}
            className="w-full rounded-md px-8 py-2 border-[1px]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
