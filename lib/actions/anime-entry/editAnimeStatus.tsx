"use server"

import { failedToFindUserMsg, dbErrorMsg, failErrorMsg } from "@/lib/actions/errorMessages"
import startDB from "@/lib/db"
import AnimeModel from "@/models/animeModel"

export const editAnimeStatus = async (
  data: string,
  id: string | undefined,
  user_id: string | undefined
) => {
  //Check if the  both ID's existseven exists
  if (!user_id) throw new Error(failedToFindUserMsg)

  //Try to connect to the database
  const connection = await startDB()
  if (!connection) throw new Error(dbErrorMsg)

  //Update the anime's status as long as it matches anime's ID and user's ID
  let updatedAnimeStatus = await AnimeModel.findOneAndUpdate(
    { mal_id: id, user_id: user_id },
    { status: data },
    { new: true }
  )
  if (!updatedAnimeStatus) throw new Error(failErrorMsg)
}
