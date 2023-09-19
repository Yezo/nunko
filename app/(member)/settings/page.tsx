import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { EditUserForm } from "@/components/forms/edit-user-form"
import { AppearanceThemePicker } from "@/components/settings/appearance"
import { PrivacyPicker } from "@/components/settings/privacy"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { editUserPrivacy } from "@/lib/actions/editUserPrivacy"
import { getUser } from "@/lib/actions/getUser"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)
  const user = await getUser(session?.user?.id)
  const parsedUser = JSON.parse(JSON.stringify(user))

  async function changePrivacy(value: string) {
    "use server"
    try {
      await editUserPrivacy(value, session?.user?.id)
      revalidatePath("/settings")
    } catch (e) {
      console.log("There was an error.")
    }
  }

  return (
    <main className="container mx-auto flex-1 space-y-16 px-4 py-20 sm:px-8 md:px-12 lg:px-80">
      <h1 className="font-domine text-xl">Settings</h1>

      <section className="space-y-2">
        <h2>Membership Status</h2>
        <div className="rounded-md border p-8">ye</div>
      </section>

      <section className="space-y-2">
        <EditUserForm session={session} user={parsedUser} />
      </section>

      {/* <section className="space-y-2">
        <AppearanceThemePicker />
      </section>

      <section className="space-y-2">
        <PrivacyPicker user={parsedUser} changePrivacy={changePrivacy} />
      </section> */}

      <div className="flex justify-end space-x-4">
        <Button>Log out</Button>
        <Button variant={"destructive"}>Delete my account</Button>
      </div>
    </main>
  )
}
