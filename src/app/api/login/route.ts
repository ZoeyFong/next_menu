import { NextResponse } from "next/server"
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

const schema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(3).max(30),
})

export async function POST(req: Request, res: Response) {
  try {
    const { username, password } = await req.json()

    const parse = schema.safeParse({
      username,
      password,
    })

    if (
      !parse.success ||
      !mockData.find((e) => e.username === username && e.password === password)
    ) {
      return NextResponse.json(
        { message: "Invalid username or password", code: 400 },
        { status: 400 }
      )
    }
    return NextResponse.json({ message: "Success", code: 200 }, { status: 200 })
  } catch (e) {
    return NextResponse.json(
      { message: "Internal error", code: 500 },
      { status: 500 }
    )
  }
}
