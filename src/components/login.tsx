"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import {
  TFormFields,
  defaultFieldsVal,
  loginFields,
} from "@/config/login-field"
import { debounce } from "@/utils/debounce"

export default function Login({
  setLoginVisible,
}: {
  setLoginVisible: (v: boolean) => void
}) {
  const [formData, setFormData] = useState<TFormFields>(defaultFieldsVal)

  const closeLogin = () => setLoginVisible(false)

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault()
    const { username, password } = formData
    if (!username || !password) return alert("last name or first name is empty")

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code !== 200) throw data.message
        closeLogin()
      })
      .catch((err) => alert(err))
  }

  const onChangeForm = debounce((e: ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  })

  useEffect(() => {
    const escLister = (e: { key: string }) => {
      if (e.key === "Escape") closeLogin()
    }
    document.addEventListener("keydown", escLister)
    return () => {
      document.removeEventListener("keydown", escLister)
    }
  }, [])

  return (
    <div className="z-2 absolute top-[20%] rounded-md shadow-md w-[90%] left-[5%] sm:w-[50%] sm:left-[25%] lg:w-[30%] lg:left-[35%] p-6 bg-slate-50 dark:bg-slate-800">
      <form onSubmit={onSubmitForm} onChange={onChangeForm}>
        <div className="space-y-6">
          {loginFields.map(({ value, label, type }) => (
            <div key={value} className="space-y-3">
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
              ></input>
            </div>
          ))}
        </div>
        <hr className="text-slate-50 dark:text-slate-800 my-8 opacity-50" />
        <div className="mt-6 flex-col font-bold space-y-5 text-center">
          <button
            type="submit"
            className="rounded-md px-8 py-2 border-[1px] bg-slate-800 dark:bg-slate-50 text-slate-50 dark:text-slate-800 cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={closeLogin}
            className="rounded-md px-8 py-2 border-[1px] cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
