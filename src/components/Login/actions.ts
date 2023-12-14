"use server"

import { z } from "zod"

const mockData = [
  {
    username: "username",
    password: "password",
  },
  {
    username: "zoey",
    password: "fong",
  },
]

export const submitAction = async (formData: FormData) => {
  const schema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(3).max(30),
  })
  try {
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    const parse = schema.safeParse({
      username,
      password,
    })

    if (
      !parse.success ||
      !mockData.find((e) => e.username === username && e.password === password)
    ) {
      return { error: "Invalid username or password", code: 400 }
    }
    return { message: "Success", code: 200 }
  } catch (e) {
    return { error: "Internal error", code: 500 }
  }
}
