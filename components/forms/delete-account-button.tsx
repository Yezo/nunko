"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TrashIcon } from "@radix-ui/react-icons"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
type Props = {
  deleteUser: () => Promise<void>
}
export const DeleteAccountButton = ({ deleteUser }: Props) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  async function handleDeletion() {
    await deleteUser()
    await signOut()
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
