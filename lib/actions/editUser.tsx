"use server"

import startDB from "@/lib/db"
import UserModel from "@/models/userModel"
import { editUserFormSchema } from "@/lib/zod/schemas"
import { z } from "zod"

export const editUser = async (
  data: z.infer<typeof editUserFormSchema>,
  id: string | undefined
) => {
  try {
    if (!id) {
      throw new Error("User not found.")
    }

    await startDB()
    let updatedUser = await UserModel.findByIdAndUpdate(id, { name: data.name }, { new: true })

    if (!updatedUser) {
      throw new Error("Failed to update the user.")
    }
  } catch (error) {
    throw new Error("There was an error")
  }
}
