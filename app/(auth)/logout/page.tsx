"use client"

import { Metadata } from "next"
import { signOut } from "next-auth/react"

import { Icons } from "@/components/icons"

// export const metadata: Metadata = {
//   title: "Logout",
//   description: "Logout of your account",
// }

export default function LoginPage() {

  const run = async () => {
    const data = await signOut({ callbackUrl: '/' });
    console.log(data);
  }
  run();

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo 
          />
          <h1 className="text-2xl font-semibold tracking-tight">
            Logging you out...
          </h1>
          <p className="text-sm text-muted-foreground">
            Please wait while we redirect you...
          </p>
        </div>
      </div>
    </div>
  )
}
