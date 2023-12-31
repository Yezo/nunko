"use client"

import * as z from "zod"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { FormFieldItem } from "@/components/forms/form-field-item"
import { createUserSchema } from "@/lib/zod/schemas"
import { createUser } from "@/lib/actions/user/createUser"
import { UpdateIcon, EyeOpenIcon, EyeNoneIcon, CrumpledPaperIcon } from "@radix-ui/react-icons"
import { ErrorMessage } from "@/components/forms/error-message"
import {
  dbErrorMsg,
  emailErrorMsg,
  failErrorMsg,
  userErrorMsg,
  zodErrorMsg,
} from "@/lib/actions/errorMessages"

export const CreateAccountForm = () => {
  //States
  const [inUseError, setInUseError] = useState(false)
  const [handlingError, setHandlingError] = useState(false)
  const [passwordVisiblity, setPasswordVisiblity] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof createUserSchema>) => {
    try {
      await createUser(data)
      form.reset()
      form.clearErrors()
      router.push("/signin")
    } catch (e: unknown) {
      if (e instanceof Error) {
        const { message: err } = e
        if (err === emailErrorMsg || err === userErrorMsg) setInUseError(true)
        else if (err === zodErrorMsg || err === dbErrorMsg || failErrorMsg) setHandlingError(true)
      }
    }
  }

  return (
    <div className="min-w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 pb-6">
            <Link
              href="/"
              className="flex items-center gap-2 pb-2 font-domine text-xl font-semibold tracking-tight "
            >
              <div className="rounded-md border border-muted/80 bg-gradient-to-t from-gray-900/90 to-gray-900/0 p-1.5 text-foreground shadow-sm">
                <CrumpledPaperIcon className="h-6 w-6" />
              </div>
            </Link>

            <h1 className="font-domine text-2xl leading-none">Welcome to Nunko, </h1>

            <p className="text-sm leading-none text-muted-foreground">
              Create your account within seconds - enjoy Nunko forever.
            </p>
          </div>

          {inUseError && <ErrorMessage type="inUse" />}
          {handlingError && <ErrorMessage type="handling" />}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormFieldItem title="Username" errorPosition="bottom">
                <Input placeholder="Nunko" className="text-xs placeholder:text-xs" {...field} />
              </FormFieldItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormFieldItem title="Email" errorPosition="bottom">
                <Input
                  placeholder="nunko@example.com"
                  type="email"
                  className="text-xs placeholder:text-xs"
                  {...field}
                />
              </FormFieldItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormFieldItem title="Password" errorPosition="bottom">
                <div className="flex items-center">
                  <Input
                    placeholder="********"
                    type={passwordVisiblity ? "text" : "password"}
                    className="text-xs placeholder:text-xs"
                    {...field}
                  />
                  {passwordVisiblity ? (
                    <EyeNoneIcon
                      className="-m-8 cursor-pointer text-muted-foreground"
                      onClick={() => setPasswordVisiblity(!passwordVisiblity)}
                    />
                  ) : (
                    <EyeOpenIcon
                      className="-m-8 cursor-pointer text-muted-foreground"
                      onClick={() => setPasswordVisiblity(!passwordVisiblity)}
                    />
                  )}
                </div>
              </FormFieldItem>
            )}
          />

          {form.formState.isSubmitting ? (
            <Button type="submit" className="flex min-w-full items-center gap-2" disabled>
              <UpdateIcon className="h-[1rem] w-[1rem] animate-spin" /> Create Account
            </Button>
          ) : (
            <Button type="submit" className="min-w-full">
              Create account
            </Button>
          )}

          <Separator />

          <div className="flex flex-col items-center justify-center text-sm tracking-tight text-muted-foreground sm:flex-row">
            Already have an account?
            <Link href="/signin" className="pl-2 text-foreground">
              Log in
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}
