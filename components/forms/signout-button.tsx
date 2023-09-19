"use client"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

type Props = {}
export const SignOutButton = ({}: Props) => {
  return (
    <Button className="rounded" variant="outline" onClick={() => signOut()}>
      Log Out
    </Button>
  )
}
