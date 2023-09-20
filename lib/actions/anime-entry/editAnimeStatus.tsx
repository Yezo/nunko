"use server"

import startDB from "@/lib/db"
import AnimeModel from "@/models/animeModel"

export const editAnimeStatus = async (
  data: string,
  id: string | undefined,
  userID: string | undefined
) => {
  try {
    if (!id) {
      throw new Error("User not found.")
    }

    await startDB()
    let updatedUser = await AnimeModel.findOneAndUpdate(
      { mal_id: id, user_id: userID },
      { status: data },
      { new: true }
    )

    if (!updatedUser) {
      throw new Error("Failed to update the user's privacy status.")
    }
  } catch (error) {
    throw new Error("There was an error")
  }
}
