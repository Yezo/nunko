"use server"

import {
  dbErrorMsg,
  failedToFindUserMsg,
  failedToUpdatePrivacyMsg,
} from "@/lib/actions/errorMessages"
import startDB from "@/lib/db"
import UserModel from "@/models/userModel"

export const editUserPrivacy = async (data: string, id: string | undefined) => {
  //Check if the user's id exists in the database
  if (!id) throw new Error(failedToFindUserMsg)

  //Try to connect to the database
  const connection = await startDB()
  if (!connection) throw new Error(dbErrorMsg)

  //Update the user's privacy status based on user ID
  let updatedUser = await UserModel.findByIdAndUpdate(id, { privacy: data }, { new: true })
  if (!updatedUser) throw new Error(failedToUpdatePrivacyMsg)
}
