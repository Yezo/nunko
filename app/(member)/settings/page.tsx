import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Footer } from "@/components/footer/footer"
import { DeleteAccountButton } from "@/components/forms/delete-account-button"
import { EditUserForm } from "@/components/forms/edit-user-form"
import { SignOutButton } from "@/components/forms/signout-button"
import { AppearanceThemePicker } from "@/components/settings/appearance"
import { PrivacyPicker } from "@/components/settings/privacy"
import { deleteUser } from "@/lib/actions/user/deleteUser"
import { editUserPrivacy } from "@/lib/actions/user/editUserPrivacy"
import { handleResponseError } from "@/lib/fetchJikan"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export const metadata = {
  title: "Settings",
  description: "Nunko - Settings",
}

export interface IUser {
  user: User
}

export interface User {
  _id: string
  email: string
  name: string
  password: string
  role: string
  privacy: string
  avatar: string
  __v: number
}

async function fetchUser(id: string | undefined): Promise<IUser> {
  const url = `http://nunko-amber.vercel.app/api/user/${id}`
  const res = await fetch(url)
  handleResponseError(res)
  return res.json()
}

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)
  const { user } = await fetchUser(session?.user?.id)

  async function changePrivacy(value: string) {
    "use server"
    try {
      await editUserPrivacy(value, session?.user?.id)
      revalidatePath("/settings")
    } catch (e) {
      console.log("There was an error.")
    }
  }

  async function deleteUserAction() {
    "use server"
    try {
      await deleteUser(session?.user?.id)
      revalidatePath("/settings")
    } catch (e) {
      console.log("There was an error.")
    }
  }

  return (
    <main className="container mx-auto flex-1 space-y-16 px-4 py-20 sm:px-8 md:px-12 lg:px-80">
      <h1 className="font-domine text-xl">Settings</h1>

      {/* <section className="space-y-2">
        <h2>Membership Status</h2>
        <div className="rounded-md border p-8">ye</div>
      </section> */}

      <section className="space-y-2">
        <EditUserForm session={session} user={user} />
      </section>

      <section className="space-y-2">
        <AppearanceThemePicker />
      </section>

      <section className="space-y-2">
        <PrivacyPicker changePrivacy={changePrivacy} user={user} />
      </section>

      <div className="flex justify-end space-x-4">
        <SignOutButton />
        <DeleteAccountButton deleteUser={deleteUserAction} />
      </div>
    </main>
  )
}
