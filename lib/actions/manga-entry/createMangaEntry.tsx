"use server"

import startDB from "@/lib/db"
import { createMangaEntrySchema } from "@/lib/zod/schemas"
import MangaModel from "@/models/mangaModel"

import { z } from "zod"

export const createMangaEntry = async (
  data: z.infer<typeof createMangaEntrySchema>,
  userID: string
) => {
  try {
    await startDB()

    const oldManga = await MangaModel.findOne({ mal_id: data.mal_id, user_id: userID })
    if (oldManga) {
      throw new Error("This already exists.")
    }

    let createdManga = await MangaModel.create({ ...data })

    if (!createdManga) {
      throw new Error("Failed to update the user.")
    }
  } catch (error) {
    throw new Error("There was an error")
  }
}
