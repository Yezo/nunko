"use server"

import startDB from "@/lib/db"
import UserModel from "@/models/userModel"
import { editUserFormSchema } from "@/lib/zod/schemas"
import { z } from "zod"

export const editUserAvatar = async (data: string, id: string | undefined) => {
  try {
    if (!id) {
      throw new Error("User not found.")
    }

    await startDB()
    let updatedUser = await UserModel.findByIdAndUpdate(id, { avatar: data }, { new: true })

    if (!updatedUser) {
      throw new Error("Failed to update the user's avatar.")
    }
  } catch (error) {
    throw new Error("There was an error")
  }
}
