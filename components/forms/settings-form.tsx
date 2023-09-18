"use client"

import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UpdateIcon } from "@radix-ui/react-icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { Session } from "next-auth"
import { useSession } from "next-auth/react"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

//Zod Schema for sign in form
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
})

export const SettingsForm = ({ session }: { session: Session | null }) => {
  const router = useRouter()
  const { update } = useSession()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  //Function that fires when form is submited
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    //Submission
    const res = await fetch(`/api/auth/users/${session?.user?.id}`, {
      method: "PUT",
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then(() => update({ name: values.name }))

    //If there's no error, then reset the form and clear all form errors for the next time
    if (res?.user) {
      form.reset()
      form.clearErrors()
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh()
      })
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
                    Name
                  </FormLabel>
                </div>
                <FormControl>
                  <>
                    <Input
                      placeholder={`${session?.user?.name}`}
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
          {form.formState.isSubmitted && <span className="ml-4 text-sm">Saved.</span>}
          {form.formState.errors && form.formState.errors.name?.message}
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
