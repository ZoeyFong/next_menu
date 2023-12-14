"use client"

import { useAuthDispatch } from "@/app/context/AuthContext"
import { useEffect, useState } from "react"
import { submitAction } from "./actions"

const formFields = [
  {
    value: "username",
    label: "Username",
    type: "text",
  },
  {
    value: "password",
    label: "Password",
    type: "password",
  },
]

export default function Login({
  handleCloseLogin,
}: {
  handleCloseLogin: () => void
}) {
  const [error, setError] = useState("")
  const dispatchUser = useAuthDispatch()

  const handleFormAction = (formData: FormData) => {
    const { error: err } = submitAction(formData)
    if (err) setError(err)
    else {
      handleCloseLogin()
      dispatchUser({
        type: "login",
        data: {
          user: formData.get("username") as string,
        },
      })
    }
  }

  useEffect(() => {
    const escLister = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseLogin()
    }
    document.addEventListener("keydown", escLister)
    return () => {
      document.removeEventListener("keydown", escLister)
    }
  }, [handleCloseLogin])

  return (
    <div className="z-[1000] absolute top-[20%] rounded-md shadow-md w-[90%] left-[5%] sm:w-[50%] sm:left-[25%] lg:w-[30%] lg:left-[35%] p-6 bg-slate-50 dark:bg-slate-800">
      <form
        // @ts-ignore
        action={handleFormAction}
        data-testid="login-form"
      >
        <div className="space-y-6">
          {formFields.map(({ value, label, type }) => (
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
                required
              />
            </div>
          ))}
        </div>
        <div className="text-red-500 h-[50px] leading-[50px]">{error}</div>
        <hr className="text-slate-50 dark:text-slate-800 mb-8 opacity-50" />
        <div className="mt-6 flex-col font-bold space-y-5 text-center">
          <button
            type="submit"
            className="w-full rounded-md px-8 py-2 border-[1px] bg-slate-800 dark:bg-slate-50 text-slate-50 dark:text-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:dark:bg-slate-300"
          >
            Submit
          </button>
          <button
            onClick={handleCloseLogin}
            className="w-full rounded-md px-8 py-2 border-[1px]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
