import startDB from "@/lib/db"
import UserModel from "@/models/userModel"

export const getUser = async (userID: string | undefined) => {
  try {
    if (!userID) {
      throw new Error("User not found.")
    }
    await startDB()
    let updatedUser = await UserModel.findOne({ _id: userID })

    if (!updatedUser) {
      throw new Error("Failed to update the user's privacy status.")
    }

    return updatedUser
  } catch (error) {
    throw new Error("There was an error")
  }
}
