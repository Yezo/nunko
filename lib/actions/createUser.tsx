"use server"

import startDB from "@/lib/db"
import UserModel from "@/models/userModel"
import { createUserSchema } from "@/lib/zod/schemas"
import { z } from "zod"

export const createUser = async (data: z.infer<typeof createUserSchema>) => {
  try {
    await startDB()

    const oldUser = await UserModel.findOne({ email: data.email })
    if (oldUser) {
      throw new Error("Email is already in use.")
    }

    let updatedUser = await UserModel.create({ ...data })

    if (!updatedUser) {
      throw new Error("Failed to update the user.")
    }
  } catch (error) {
    throw new Error("There was an error")
  }
}
