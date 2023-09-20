"use server"

import startDB from "@/lib/db"
import MangaModel from "@/models/mangaModel"

export const deleteMangaEntry = async (mal_id: number | undefined, user_id: string | undefined) => {
  try {
    if (!mal_id && user_id) {
      throw new Error("User and user's entry could not be found.")
    }

    await startDB()

    let deletedMangaEntry = await MangaModel.findOneAndDelete({ mal_id: mal_id, user_id: user_id })

    if (!deletedMangaEntry) {
      throw new Error("Failed to delete the manga entry.")
    }
  } catch (error) {
    throw new Error("There was an error")
  }
}
