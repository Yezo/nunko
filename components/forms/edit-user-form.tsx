"use client"

import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UpdateIcon } from "@radix-ui/react-icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { Session } from "next-auth"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { editUserFormSchema } from "@/lib/zod/schemas"
import { useRouter } from "next/navigation"
import { User } from "@/app/(member)/settings/page"
import { useToast } from "@/components/ui/use-toast"
import { userErrorMsg } from "@/lib/actions/errorMessages"
import { editUser } from "@/lib/actions/user/editUser"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

type EditUserFormProps = {
  session: Session | null
  user: User
}
export const EditUserForm = ({ session, user }: EditUserFormProps) => {
  const { update } = useSession()
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof editUserFormSchema>>({
    resolver: zodResolver(editUserFormSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof editUserFormSchema>) => {
    try {
      await editUser(data, session?.user?.id)
      update({ name: data.name })
      toast({
        title: "Username changed.",
        description: `Your username was successfully changed to ${data.name}.`,
      })
      form.clearErrors()
      form.reset()
      router.refresh()
    } catch (e: unknown) {
      if (e instanceof Error) {
        const { message: err } = e
        if (err === userErrorMsg) {
          form.setError("name", { type: "custom", message: "Username is already in use." })
        } else if (err)
          form.setError("name", { type: "custom", message: "Error occurred. Try again." })
      }
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full pb-4">
                <div className="flex min-h-[16px] items-center gap-1 pb-1">
                  <FormLabel className="font-rubik text-base font-medium text-foreground">
                    Username
                  </FormLabel>
                </div>
                <FormControl>
                  <>
                    <Input
                      placeholder={`${(user && user?.name) ?? "Username"}`}
                      className="placeholder:text-xs placeholder:capitalize"
                      {...field}
                    />
                    <p className="text-sm text-muted-foreground">This is your new display name.</p>
                  </>
                </FormControl>
                <FormMessage className="text-xs dark:text-red-600" />
              </FormItem>
            )}
          />

          {form.formState.isSubmitting ? <DisabledButton /> : <ActiveButton />}
          {form.formState.isSubmitted && form.formState.isValid && (
            <span className="ml-4 text-sm">Saved.</span>
          )}
        </form>
      </Form>
    </>
  )
}

const DisabledButton = () => {
  return (
    <Button
      type="submit"
      className="flex max-w-fit items-center gap-2 bg-blue-600 text-white hover:bg-blue-600/90"
      disabled
    >
      <UpdateIcon className="h-[1rem] w-[1rem] animate-spin" /> Update profile
    </Button>
  )
}

const ActiveButton = () => {
  return (
    <Button type="submit" className="max-w-fit bg-blue-600 text-white hover:bg-blue-600/90">
      Update profile
    </Button>
  )
}
