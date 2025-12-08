"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

export default function GoogleLogin() {
  const handleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/admin",
      })
    } catch (error) {
      console.error("google login failed: ", error)
    }
  }
  return (
    <Button
      variant="outline"
      className="w-full cursor-pointer"
      onClick={handleSignIn}
    >
      Googleアカウントでログイン
    </Button>
  )
}
