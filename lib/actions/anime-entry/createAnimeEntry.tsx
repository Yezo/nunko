"use server"

import startDB from "@/lib/db"
import { createAnimeEntrySchema } from "@/lib/zod/schemas"
import { z } from "zod"
import AnimeModel from "@/models/animeModel"

export const createAnimeEntry = async (
  data: z.infer<typeof createAnimeEntrySchema>,
  userID: string
) => {
  try {
    await startDB()

    const oldEntry = await AnimeModel.findOne({ mal_id: data.mal_id, user_id: userID })
    if (oldEntry) {
      throw new Error("This already exists.")
    }

    let newEntry = await AnimeModel.create({ ...data })

    if (!newEntry) {
      throw new Error("Failed to update the user.")
    }
  } catch (error) {
    throw new Error("There was an error")
  }
}
