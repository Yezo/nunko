"use server"

import {
  dbErrorMsg,
  entryAlreadyExistsMsg,
  failErrorMsg,
  failedToFindUserMsg,
  zodErrorMsg,
} from "@/lib/actions/errorMessages"
import startDB from "@/lib/db"
import { createMangaEntrySchema } from "@/lib/zod/schemas"
import MangaModel from "@/models/mangaModel"

import { z } from "zod"

export const createMangaEntry = async (
  data: z.infer<typeof createMangaEntrySchema>,
  user_id: string
) => {
  //Parse and validate the data before we do anything with it
  //Prevents injection attacks
  try {
    createMangaEntrySchema.parse(data)
  } catch (err) {
    if (err instanceof z.ZodError) throw new Error(zodErrorMsg)
  }

  //Check if the session ID even exists
  if (!user_id) throw new Error(failedToFindUserMsg)

  //Try to connect to the database
  const connection = await startDB()
  if (!connection) throw new Error(dbErrorMsg)

  //Check if the manga entry already exists in the database
  const existingMangaEntry = await MangaModel.findOne({ mal_id: data.mal_id, user_id: user_id })
  if (existingMangaEntry) throw new Error(entryAlreadyExistsMsg)

  //Add the manga to the database under the user's list
  let newMangaEntry = await MangaModel.create({ ...data })
  if (!newMangaEntry) throw new Error(failErrorMsg)
}
