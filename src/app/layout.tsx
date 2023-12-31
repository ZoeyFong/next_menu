import type { Metadata } from "next"
import { Roboto_Mono } from "next/font/google"
import AuthProvider from "@/context/AuthContext"
import "./globals.css"

const mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Simple Menu",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${mono.className} overflow-hidden bg-gray-100 dark:bg-gray-700`}
      >
        <AuthProvider> {children}</AuthProvider>
      </body>
    </html>
  )
}
