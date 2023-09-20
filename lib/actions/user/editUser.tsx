"use server"

import startDB from "@/lib/db"
import UserModel from "@/models/userModel"
import { editUserFormSchema } from "@/lib/zod/schemas"
import { z } from "zod"
import { dbErrorMsg, failedToGetID, zodErrorMsg } from "@/lib/actions/errorMessages"

export const editUser = async (
  data: z.infer<typeof editUserFormSchema>,
  id: string | undefined
) => {
  //Parse and validate the data before we do anything with it
  //Prevents injection attacks
  try {
    editUserFormSchema.parse(data)
  } catch (err) {
    if (err instanceof z.ZodError) throw new Error(zodErrorMsg)
  }

  //Check if the session ID exists
  if (!id) throw new Error(failedToGetID)

  //Try to connect to the database
  const connection = await startDB()
  if (!connection) throw new Error(dbErrorMsg)

  //Check if the username already exists in database
  //Collation + locale + strength will find case-insensitive and ignore partial matches
  const existingUsername = await UserModel.findOne({ name: data.name }).collation({
    locale: "en",
    strength: 2,
  })
  if (existingUsername) throw new Error("Username is already in use.")

  //Otherwise, edit the username by ID
  let updatedUser = await UserModel.findByIdAndUpdate(id, { name: data.name }, { new: true })
  if (!updatedUser) throw new Error("Failed to update the user.")
}
