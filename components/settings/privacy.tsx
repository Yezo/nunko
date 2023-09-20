"use client"

import { User } from "@/app/(member)/settings/page"
import { useToast } from "@/components/ui/use-toast"
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"

type PrivacyPickerProps = {
  changePrivacy: (value: string) => Promise<void>
  user: User
}
export const PrivacyPicker = ({ changePrivacy, user }: PrivacyPickerProps) => {
  const { update } = useSession()
  const { toast } = useToast()

  async function handlePrivacy(value: string) {
    try {
      await changePrivacy(value)
      update({ privacy: value })
      toast({
        title: `${value === "hidden" ? "We respect your privacy." : "Dear social butterfly,"}`,
        description: `Your status was successfully changed to ${value}.`,
      })
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast({
          title: "An error occurred.",
          description: `${e.message}.`,
        })
      }
    }
  }
  return (
    <>
      <h2>Privacy</h2>
      <div className="flex divide-x divide-border rounded-md border">
        <div
          className={`flex-1 select-none p-8  ${
            user && user?.privacy === "public"
              ? "cursor-not-allowed bg-muted/50"
              : "cursor-pointer transition-colors hover:bg-muted/80"
          }`}
          onClick={() => handlePrivacy("public")}
        >
          <div className="grid place-items-center gap-2">
            <EyeOpenIcon className="h-5 w-5" />
            <div className="text-sm font-medium">Public</div>
          </div>
        </div>

        <div
          className={`flex-1 select-none p-8  ${
            user && user?.privacy === "hidden"
              ? "cursor-not-allowed bg-muted/50"
              : "cursor-pointer transition-colors hover:bg-muted/80"
          }`}
          onClick={() => handlePrivacy("hidden")}
        >
          <div className="grid place-items-center gap-2">
            <EyeClosedIcon className="h-5 w-5" />
            <div className="text-sm font-medium">Hidden</div>
          </div>
        </div>
      </div>
    </>
  )
}
