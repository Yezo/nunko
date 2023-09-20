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
import { createAnimeEntrySchema, createMangaEntrySchema } from "@/lib/zod/schemas"
import { useSession } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"
import { IMangaData } from "@/types/manga/type-manga"
import { createMangaEntry } from "@/lib/actions/manga-entry/createMangaEntry"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type CreateMangaEntryFormProps = {
  data?: IMangaData
  setOpen: Dispatch<SetStateAction<boolean>>
  setAdded: Dispatch<SetStateAction<boolean>>
  setStatus: Dispatch<SetStateAction<string>>
}
export const CreateMangaEntryForm = ({
  data,
  setOpen,
  setAdded,
  setStatus,
}: CreateMangaEntryFormProps) => {
  const session = useSession()
  const userId = (session?.data?.user?.id as string) ?? ""
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof createAnimeEntrySchema>>({
    resolver: zodResolver(createMangaEntrySchema),
    defaultValues: {
      type: "manga",
      title: data?.title,
      mal_id: data?.mal_id,
      status: "Reading",
      score: "0",
      progress: "0",
      user_id: userId,
    },
  })

  const onSubmit = async (data: z.infer<typeof createMangaEntrySchema>) => {
    try {
      await createMangaEntry(data, userId)
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
    } catch (e) {
      console.log(e)
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
                  <Input placeholder="0" className="text-xs placeholder:text-xs" {...field} />
                </FormFieldItem>
              )}
            />
            <FormField
              control={form.control}
              name="progress"
              render={({ field }) => (
                <FormFieldItem title="Episodes" errorPosition="bottom" widthFull={true}>
                  <Input placeholder="0" className="text-xs placeholder:text-xs" {...field} />
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
                    <SelectValue placeholder="Reading" {...field} />
                  </SelectTrigger>
                  <SelectContent className="text-xs">
                    <SelectItem value="Reading" className="text-xs">
                      Reading
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
