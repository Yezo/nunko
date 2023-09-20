"use client"

import * as z from "zod"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Dispatch, SetStateAction, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { FormFieldItem } from "@/components/forms/form-field-item"
import { createAnimeEntrySchema, createUserSchema } from "@/lib/zod/schemas"
import { createUser } from "@/lib/actions/createUser"
import { UpdateIcon, EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons"
import { createAnimeEntry } from "@/lib/actions/createAnimeEntry"
import { IAnimeData } from "@/types/anime/type-anime"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSession } from "next-auth/react"

type CreateAnimeEntryFormProps = {
  data?: IAnimeData
  setOpen: Dispatch<SetStateAction<boolean>>
  setAdded: Dispatch<SetStateAction<boolean>>
  setStatus: Dispatch<SetStateAction<string>>
}
export const CreateAnimeEntryForm = ({
  data,
  setOpen,
  setAdded,
  setStatus,
}: CreateAnimeEntryFormProps) => {
  const session = useSession()
  const userId = (session?.data?.user?.id as string) ?? ""
  const [isPending, startTransition] = useTransition()
  //States
  const router = useRouter()

  console.log(data)

  const form = useForm<z.infer<typeof createAnimeEntrySchema>>({
    resolver: zodResolver(createAnimeEntrySchema),
    defaultValues: {
      type: "anime",
      title: data?.title,
      mal_id: data?.mal_id,
      status: "Watching",
      score: "0",
      progress: "0",
      user_id: userId,
    },
  })

  const onSubmit = async (data: z.infer<typeof createAnimeEntrySchema>) => {
    try {
      console.log(data)
      await createAnimeEntry(data, userId)
      setOpen(false)
      setAdded(true)
      setStatus(data.status)
      form.reset()
      form.clearErrors()
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh()
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="min-w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormFieldItem title="Title" errorPosition="bottom">
                <Input placeholder="Nunko" className="text-xs placeholder:text-xs" {...field} />
              </FormFieldItem>
            )}
          />

          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormFieldItem title="Score" errorPosition="bottom" widthFull={true}>
                  <div className="flex items-center">
                    <Input placeholder="0" className="text-xs placeholder:text-xs" {...field} />
                  </div>
                </FormFieldItem>
              )}
            />
            <FormField
              control={form.control}
              name="progress"
              render={({ field }) => (
                <FormFieldItem title="Episodes" errorPosition="bottom" widthFull={true}>
                  <div className="flex items-center">
                    <Input placeholder="0" className="text-xs placeholder:text-xs" {...field} />
                  </div>
                </FormFieldItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormFieldItem title="Status" errorPosition="top" widthFull={true}>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Watching" {...field} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Watching">Watching</SelectItem>
                    <SelectItem value="Planning">Watch Later</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Paused">Paused</SelectItem>
                    <SelectItem value="Hiatus">Hiatus</SelectItem>
                    <SelectItem value="Dropped">Dropped</SelectItem>
                  </SelectContent>
                </Select>
              </FormFieldItem>
            )}
          />

          {form.formState.isSubmitting ? (
            <Button type="submit" className="flex min-w-full items-center gap-2" disabled>
              <UpdateIcon className="h-[1rem] w-[1rem] animate-spin" /> Add entry
            </Button>
          ) : (
            <Button type="submit" className="min-w-full">
              Add entry
            </Button>
          )}
        </form>
      </Form>
    </div>
  )
}
