"use server"

import startDB from "@/lib/db"
import UserModel from "@/models/userModel"

export const editUserPrivacy = async (data: string, id: string | undefined) => {
  try {
    if (!id) {
      throw new Error("User not found.")
    }

    await startDB()
    let updatedUser = await UserModel.findByIdAndUpdate(id, { privacy: data }, { new: true })

    if (!updatedUser) {
      throw new Error("Failed to update the user's privacy status.")
    }
  } catch (error) {
    throw new Error("There was an error")
  }
}
