"use server"

import { dbErrorMsg, failedToDeleteMsg, failedToFindUserMsg } from "@/lib/actions/errorMessages"
import startDB from "@/lib/db"
import UserModel from "@/models/userModel"

export const deleteUser = async (id: string | undefined) => {
  //Check if the user's id exists in the database
  if (!id) throw new Error(failedToFindUserMsg)

  //Try to connect to the database
  const connection = await startDB()
  if (!connection) throw new Error(dbErrorMsg)

  //Delete the user from the database by ID
  let deletedUser = await UserModel.findByIdAndDelete(id)
  if (!deletedUser) throw new Error(failedToDeleteMsg)
}
