"use server"

import { failedToFindUserMsg, dbErrorMsg, failErrorMsg } from "@/lib/actions/errorMessages"
import startDB from "@/lib/db"
import AnimeModel from "@/models/animeModel"

export const deleteAnimeEntry = async (mal_id: number | undefined, user_id: string | undefined) => {
  //Check if both ID's are undefined or not
  if (!mal_id && !user_id) throw new Error(failedToFindUserMsg)

  //Try to connect to the database
  const connection = await startDB()
  if (!connection) throw new Error(dbErrorMsg)

  //Find and delete the entry that matches the anime's ID and user's ID
  let deletedAnimeEntry = await AnimeModel.findOneAndDelete({ mal_id: mal_id, user_id: user_id })
  if (!deletedAnimeEntry) throw new Error(failErrorMsg)
}
