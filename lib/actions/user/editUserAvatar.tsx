"use server"

import startDB from "@/lib/db"
import UserModel from "@/models/userModel"
import {
  dbErrorMsg,
  failedToFindUserMsg,
  failedToUpdateAvatarMsg,
} from "@/lib/actions/errorMessages"

export const editUserAvatar = async (data: string, id: string | undefined) => {
  //Check if the user's id exists in the database
  if (!id) throw new Error(failedToFindUserMsg)

  //Try to connect to the database
  const connection = await startDB()
  if (!connection) throw new Error(dbErrorMsg)

  //Update the avatar based on user's ID
  let updatedUser = await UserModel.findByIdAndUpdate(id, { avatar: data }, { new: true })
  if (!updatedUser) throw new Error(failedToUpdateAvatarMsg)
}
