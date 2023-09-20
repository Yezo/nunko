import { dbErrorMsg, failedToFindUserMsg } from "@/lib/actions/errorMessages"
import startDB from "@/lib/db"
import UserModel from "@/models/userModel"

export const getUser = async (id: string | undefined) => {
  //Check if the user's id exists in the database
  if (!id) throw new Error(failedToFindUserMsg)

  //Try to connect to the database
  const connection = await startDB()
  if (!connection) throw new Error(dbErrorMsg)

  //Find a user based on a session ID
  let updatedUser = await UserModel.findOne({ _id: id })
  if (!updatedUser) throw new Error(failedToFindUserMsg)

  return updatedUser
}
