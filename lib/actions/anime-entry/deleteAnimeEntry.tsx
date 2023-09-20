"use server"

import startDB from "@/lib/db"
import AnimeModel from "@/models/animeModel"

export const deleteAnimeEntry = async (mal_id: number | undefined, user_id: string | undefined) => {
  try {
    if (!mal_id && user_id) {
      throw new Error("User and user's entry could not be found.")
    }

    await startDB()

    let deletedAnimeEntry = await AnimeModel.findOneAndDelete({ mal_id: mal_id, user_id: user_id })

    if (!deletedAnimeEntry) {
      throw new Error("Failed to delete the anime entry.")
    }
  } catch (error) {
    throw new Error("There was an error")
  }
}
