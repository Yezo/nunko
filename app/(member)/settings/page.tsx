import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { EditUserForm } from "@/components/forms/edit-user-form"
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth"

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  return (
    <main className="container mx-auto flex-1 space-y-16 px-4 py-20 sm:px-8 md:px-12 lg:px-80">
      <h1 className="font-domine text-xl">Settings</h1>

      <section className="space-y-2">
        <h2>Membership Status</h2>
        <div className="rounded-md border p-8">ye</div>
      </section>

      <section className="space-y-2">
        <EditUserForm session={session} />
      </section>

      <section className="space-y-2">
        <h2>Appearance</h2>
        <div className="rounded-md border p-8">ye</div>
      </section>

      <section className="space-y-2">
        <h2>Privacy</h2>
        <div className="rounded-md border p-8">ye</div>
      </section>

      <div className="flex justify-end space-x-4">
        <Button>Log out</Button>
        <Button variant={"destructive"}>Delete my account</Button>
      </div>
    </main>
  )
}
