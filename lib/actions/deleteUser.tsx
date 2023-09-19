"use server"

import startDB from "@/lib/db"
import UserModel from "@/models/userModel"

export const deleteUser = async (id: string | undefined) => {
  try {
    if (!id) {
      throw new Error("User not found.")
    }

    await startDB()
    let updatedUser = await UserModel.findByIdAndDelete(id)

    if (!updatedUser) {
      throw new Error("Failed to delete the user.")
    }
  } catch (error) {
    throw new Error("There was an error")
  }
}
