"use client"

import { Button } from "@/components/ui/button"
import { TrashIcon } from "@radix-ui/react-icons"
import { signOut } from "next-auth/react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

type DeleteAccountButtonProps = {
  deleteUser: () => Promise<void>
}

export const DeleteAccountButton = ({ deleteUser }: DeleteAccountButtonProps) => {
  const [open, setOpen] = useState(false)

  const { toast } = useToast()
  async function handleDeletion() {
    try {
      await deleteUser()
      await signOut()
    } catch (e: unknown) {
      if (e instanceof Error)
        toast({
          title: "An error occurred.",
          description: `${e.message}`,
        })
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Delete account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-medium">Are you sure absolutely sure?</DialogTitle>
          <DialogDescription className="pb-8 pt-4">
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription>
          <div className="flex justify-end gap-2 py-2">
            <Button onClick={() => setOpen(false)}>No</Button>
            <Button variant="destructive" onClick={handleDeletion}>
              <TrashIcon className="mr-2" />
              Yes, delete my account
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
