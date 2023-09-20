"use server"

import startDB from "@/lib/db"
import { createAnimeEntrySchema } from "@/lib/zod/schemas"
import { z } from "zod"
import AnimeModel from "@/models/animeModel"
import {
  zodErrorMsg,
  failedToFindUserMsg,
  dbErrorMsg,
  failErrorMsg,
} from "@/lib/actions/errorMessages"

export const editAnimeEntry = async (
  data: z.infer<typeof createAnimeEntrySchema>,
  user_id: string
) => {
  //Parse and validate the data before we do anything with it
  //Prevents injection attacks
  try {
    createAnimeEntrySchema.parse(data)
  } catch (err) {
    if (err instanceof z.ZodError) throw new Error(zodErrorMsg)
  }

  //Check if the session ID even exists
  if (!user_id) throw new Error(failedToFindUserMsg)

  //Try to connect to the database
  const connection = await startDB()
  if (!connection) throw new Error(dbErrorMsg)

  //Find an anime entry that matches 'user_id' of the session and mal_id of the anime entry
  //Update with new data values
  const updatedEntry = await AnimeModel.findOneAndUpdate(
    { mal_id: data.mal_id, user_id: user_id },
    { ...data },
    { new: true }
  )
  if (!updatedEntry) throw new Error(failErrorMsg)
}
