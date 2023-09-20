"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Dispatch, SetStateAction, useTransition } from "react"
import { useRouter } from "next/navigation"
import { FormFieldItem } from "@/components/forms/form-field-item"
import { createAnimeEntrySchema } from "@/lib/zod/schemas"
import { UpdateIcon } from "@radix-ui/react-icons"
import { IAnimeData } from "@/types/anime/type-anime"
import { useSession } from "next-auth/react"
import { editAnimeEntry } from "@/lib/actions/editAnimeEntry"
import { Anime } from "@/app/anime/[id]/layout"
import { deleteAnimeEntry } from "@/lib/actions/anime-entry/deleteAnimeEntry"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type EditAnimeEntryFormProps = {
  data?: IAnimeData
  setOpen: Dispatch<SetStateAction<boolean>>
  setAdded: Dispatch<SetStateAction<boolean>>
  setStatus: Dispatch<SetStateAction<string>>
  filtered: Anime[]
}
export const EditAnimeEntryForm = ({
  data,
  setOpen,
  setAdded,
  setStatus,
  filtered,
}: EditAnimeEntryFormProps) => {
  const session = useSession()
  const userId = (session?.data?.user?.id as string) ?? ""
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof createAnimeEntrySchema>>({
    resolver: zodResolver(createAnimeEntrySchema),
    defaultValues: {
      type: "anime",
      title: data?.title,
      mal_id: data?.mal_id,
      status: filtered[0]?.status,
      score: filtered[0]?.score,
      progress: filtered[0]?.progress,
      user_id: userId,
    },
  })

  const onSubmit = async (data: z.infer<typeof createAnimeEntrySchema>) => {
    try {
      await editAnimeEntry(data, userId)
      setOpen(false)
      setAdded(true)
      setStatus(data.status)
      form.reset()
      form.clearErrors()
      startTransition(() => {
        router.refresh()
      })
    } catch (e) {
      console.log(e)
    }
  }

  const onDelete = async (mal_id: number | undefined, user_id: string | undefined) => {
    try {
      await deleteAnimeEntry(mal_id, user_id)
      setOpen(false)
      setAdded(false)
      startTransition(() => {
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
                    <SelectItem value="Planned">Watch Later</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Paused">Paused</SelectItem>
                    <SelectItem value="Hiatus">Hiatus</SelectItem>
                    <SelectItem value="Dropped">Dropped</SelectItem>
                  </SelectContent>
                </Select>
              </FormFieldItem>
            )}
          />

          <div className="flex gap-2">
            {form.formState.isSubmitting ? (
              <Button disabled className="flex-1 items-center gap-2">
                <UpdateIcon className="h-[1rem] w-[1rem] animate-spin" /> Delete
              </Button>
            ) : (
              <Button variant="destructive" onClick={() => onDelete(data?.mal_id, userId)}>
                Delete
              </Button>
            )}

            {form.formState.isSubmitting ? (
              <Button className="flex-1 items-center gap-2" disabled>
                <UpdateIcon className="h-[1rem] w-[1rem] animate-spin" /> Edit entry
              </Button>
            ) : (
              <Button type="submit" className="flex-1">
                Edit entry
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}
