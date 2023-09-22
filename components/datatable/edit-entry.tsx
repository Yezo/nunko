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
  data?: Anime | undefined
  setOpen: Dispatch<SetStateAction<boolean>>
}
export const EditTableForm = ({ data, setOpen }: EditAnimeEntryFormProps) => {
  const { toast } = useToast()
  const router = useRouter()
  const session = useSession()
  const [isPending, startTransition] = useTransition()
  const userId = (session?.data?.user?.id as string) ?? ""

  const form = useForm<z.infer<typeof createAnimeEntrySchema>>({
    resolver: zodResolver(createAnimeEntrySchema),
    defaultValues: {
      type: data?.type,
      title: data?.title,
      mal_id: data?.mal_id,
      status: data?.status,
      score: data?.score,
      progress: data?.progress,
      user_id: userId,
      image: data?.image,
      episodes: data?.episodes,
      airingStatus: data?.airingStatus,
      username: data?.username,
      airDate: data?.airDate,
      duration: data?.duration,
    },
  })

  const onSubmit = async (data: z.infer<typeof createAnimeEntrySchema>) => {
    try {
      await editAnimeEntry(data, userId)
      setOpen(false)
      toast({
        description: `${data?.title} has been edited.`,
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

  const onDelete = async (mal_id: number | undefined, user_id: string | undefined) => {
    try {
      await deleteAnimeEntry(mal_id, user_id)
      setOpen(false)
      toast({
        variant: "destructive",
        description: `${data?.title} was removed from your list.`,
      })
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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormFieldItem title="Score" errorPosition="bottom">
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
                <FormFieldItem title="Episodes" errorPosition="bottom">
                  <Input
                    placeholder="0"
                    type="number"
                    min={0}
                    max={data?.episodes ? Number(data?.episodes) : 2000}
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
              <FormFieldItem title="Status" errorPosition="top">
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="text-xs placeholder:text-xs">
                    <SelectValue placeholder={data?.status} {...field} />
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
              type="button"
            >
              Delete
            </Button>

            <Button type="submit" className="flex-1">
              Edit entry
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
