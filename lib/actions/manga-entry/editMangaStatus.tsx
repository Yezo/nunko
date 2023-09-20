"use server"

import { failedToFindUserMsg, dbErrorMsg, failErrorMsg } from "@/lib/actions/errorMessages"
import startDB from "@/lib/db"
import MangaModel from "@/models/mangaModel"

export const editMangaStatus = async (
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
  let updatedMangaStatus = await MangaModel.findOneAndUpdate(
    { mal_id: id, user_id: user_id },
    { status: data },
    { new: true }
  )
  if (!updatedMangaStatus) throw new Error(failErrorMsg)
}
