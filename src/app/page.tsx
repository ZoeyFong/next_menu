"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import Loading from "@/components/loading"
import Mask from "@/components/mask"

const Login = dynamic(() => import("../components/login"), {
  loading: () => <Loading />,
})

export default function Home() {
  const [loginIsVisible, setLoginVisible] = useState<boolean>(false)

  const handleClickMenuArea = () => {
    setLoginVisible(true)
  }

  return (
    <main className="flex min-h-screen w-full sm:w-3xl md:w-4xl m-auto p-4 flex flex-col align-center">
      <h1 className="font-extrabold text-3xl mb-6">Homepage</h1>
      <section
        className="w-full space-y-8 border-gray-300 py-8 px-4 rounded-md shadow-md bg-slate-50 dark:bg-slate-800"
        onClick={handleClickMenuArea}
      >
        {new Array(3).fill("").map((_, i) => (
          <div className="cursor-pointer hover:text-slate-300" key={i}>
            Menu Button {i + 1}
          </div>
        ))}
      </section>
      {loginIsVisible && (
        <>
          <Mask />
          <Login setLoginVisible={setLoginVisible} />
        </>
      )}
    </main>
  )
}
