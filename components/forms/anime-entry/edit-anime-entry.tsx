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
import { IAnimeData } from "@/types/anime/type-anime"
import { useSession } from "next-auth/react"
import { editAnimeEntry } from "@/lib/actions/anime-entry/editAnimeEntry"
import { Anime } from "@/app/anime/[id]/layout"
import { deleteAnimeEntry } from "@/lib/actions/anime-entry/deleteAnimeEntry"
import { useToast } from "@/components/ui/use-toast"
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
  filtered: Anime | undefined
  status: string
}
export const EditAnimeEntryForm = ({
  data,
  setOpen,
  setAdded,
  setStatus,
  filtered,
  status,
}: EditAnimeEntryFormProps) => {
  const session = useSession()
  const userId = (session?.data?.user?.id as string) ?? ""
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof createAnimeEntrySchema>>({
    resolver: zodResolver(createAnimeEntrySchema),
    defaultValues: {
      type: "anime",
      title: data?.title,
      mal_id: data?.mal_id,
      status: filtered?.status,
      score: filtered?.score,
      progress: filtered?.progress,
      user_id: userId,
    },
  })

  const onSubmit = async (data: z.infer<typeof createAnimeEntrySchema>) => {
    try {
      await editAnimeEntry(data, userId)
      setOpen(false)
      setAdded(true)
      setStatus(data.status)
      toast({
        description: `${data?.title} has been edited.`,
      })
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
      toast({
        variant: "destructive",
        description: `${data?.title} was removed from your list.`,
      })
      startTransition(() => {
        router.refresh()
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormFieldItem title="Score" errorPosition="bottom">
                  <Input placeholder="0" className="text-xs placeholder:text-xs" {...field} />
                </FormFieldItem>
              )}
            />
            <FormField
              control={form.control}
              name="progress"
              render={({ field }) => (
                <FormFieldItem title="Episodes" errorPosition="bottom">
                  <Input placeholder="0" className="text-xs placeholder:text-xs" {...field} />
                </FormFieldItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormFieldItem title="Status" errorPosition="top">
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="text-xs placeholder:text-xs">
                    <SelectValue placeholder={status ? status : filtered?.status} {...field} />
                  </SelectTrigger>
                  <SelectContent className="text-xs">
                    <SelectItem value="Watching" className="text-xs">
                      Watching
                    </SelectItem>
                    <SelectItem value="Planned" className="text-xs">
                      Watch Later
                    </SelectItem>
                    <SelectItem value="Completed" className="text-xs">
                      Completed
                    </SelectItem>
                    <SelectItem value="Paused" className="text-xs">
                      Paused
                    </SelectItem>
                    <SelectItem value="Hiatus" className="text-xs">
                      Hiatus
                    </SelectItem>
                    <SelectItem value="Dropped" className="text-xs">
                      Dropped
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormFieldItem>
            )}
          />

          <div className="flex gap-2">
            <Button
              variant="destructive"
              onClick={() => onDelete(data?.mal_id, userId)}
              className="min-w-[100px]"
            >
              Delete
            </Button>

            <Button type="submit" className="flex-1">
              Edit entry
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
