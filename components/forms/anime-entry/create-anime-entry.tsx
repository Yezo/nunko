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
import { createAnimeEntry } from "@/lib/actions/anime-entry/createAnimeEntry"
import { IAnimeData } from "@/types/anime/type-anime"
import { useSession } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  const router = useRouter()
  const { toast } = useToast()

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
      image: data?.images?.webp?.image_url,
      episodes: data?.episodes ?? 0,
      airingStatus: data?.status,
    },
  })

  const onSubmit = async (data: z.infer<typeof createAnimeEntrySchema>) => {
    try {
      await createAnimeEntry(data, userId)
      setOpen(false)
      setAdded(true)
      setStatus(data.status)
      toast({
        description: `${data.title} was added to your list.`,
      })
      form.reset()
      form.clearErrors()
      startTransition(() => {
        router.refresh()
      })
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast({
          title: "An error occurred.",
          description: `${e.message}`,
        })
      }
    }
  }

  return (
    <div className="min-w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormFieldItem title="Score" errorPosition="bottom" widthFull={true}>
                  <Input
                    placeholder="0"
                    type="number"
                    min={0}
                    max={10}
                    step={0.5}
                    className="text-xs placeholder:text-xs"
                    {...field}
                  />
                </FormFieldItem>
              )}
            />
            <FormField
              control={form.control}
              name="progress"
              render={({ field }) => (
                <FormFieldItem title="Episodes" errorPosition="bottom" widthFull={true}>
                  <Input
                    placeholder="0"
                    type="number"
                    min={0}
                    max={Number(data?.episodes) ?? 2000}
                    className="text-xs placeholder:text-xs"
                    {...field}
                  />
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
                  <SelectTrigger className="text-xs placeholder:text-xs">
                    <SelectValue placeholder="Watching" {...field} />
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

          <Button type="submit" className="min-w-full">
            Add entry
          </Button>
        </form>
      </Form>
    </div>
  )
}
