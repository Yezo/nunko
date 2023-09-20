"use server"

import startDB from "@/lib/db"
import { createAnimeEntrySchema } from "@/lib/zod/schemas"
import { z } from "zod"
import AnimeModel from "@/models/animeModel"
import {
  zodErrorMsg,
  failedToFindUserMsg,
  dbErrorMsg,
  entryAlreadyExistsMsg,
  failErrorMsg,
} from "@/lib/actions/errorMessages"

export const createAnimeEntry = async (
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

  //Check if the anime already exists in the database
  const existingAnimeEntry = await AnimeModel.findOne({ mal_id: data.mal_id, user_id: user_id })
  if (existingAnimeEntry) throw new Error(entryAlreadyExistsMsg)

  //Add the anime to the database under the user's list
  let newAnimeEntry = await AnimeModel.create({ ...data })
  if (!newAnimeEntry) throw new Error(failErrorMsg)
}
