"use server"

import startDB from "@/lib/db"
import { createMangaEntrySchema } from "@/lib/zod/schemas"
import { z } from "zod"
import MangaModel from "@/models/mangaModel"

export const editMangaEntry = async (
  data: z.infer<typeof createMangaEntrySchema>,
  userID: string
) => {
  try {
    //Check if there is a user in the databsae
    if (!userID) {
      throw new Error("User not found.")
    }

    //Connect to the database
    await startDB()

    //Find an anime entry that matches 'user_id' of the session and mal_id of the anime entry
    //Update with new data values
    const updatedEntry = await MangaModel.findOneAndUpdate(
      { mal_id: data.mal_id, user_id: userID },
      { ...data },
      { new: true }
    )

    //Check if the anime entry was found and updated accordingly
    if (!updatedEntry) {
      throw new Error("The manga entry could not be updated.")
    }
  } catch (error) {
    throw new Error("There was an error connecting to the database.")
  }
}
