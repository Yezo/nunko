"use server"

import startDB from "@/lib/db"
import UserModel from "@/models/userModel"
import { createUserSchema } from "@/lib/zod/schemas"
import { z } from "zod"
import {
  dbErrorMsg,
  emailErrorMsg,
  failErrorMsg,
  userErrorMsg,
  zodErrorMsg,
} from "@/lib/actions/errorMessages"

export const createUser = async (data: z.infer<typeof createUserSchema>) => {
  //Parse and validate the data before we do anything with it
  //Prevents injection attacks
  try {
    createUserSchema.parse(data)
  } catch (err) {
    if (err instanceof z.ZodError) throw new Error(zodErrorMsg)
  }

  //Try to connect to the database
  const connection = await startDB()
  if (!connection) throw new Error(dbErrorMsg)

  //Check if the email already exists in database
  const emailAlreadyExists = await UserModel.findOne({ email: data.email })
  if (emailAlreadyExists) throw new Error(emailErrorMsg)

  //Check if the username already exists in database
  //Collation + locale + strength will find case-insensitive and ignore partial matches
  const usernameAlreadyExists = await UserModel.findOne({ name: data.name }).collation({
    locale: "en",
    strength: 2,
  })
  if (usernameAlreadyExists) throw new Error(userErrorMsg)

  //Otherwise, create a new user and add to the database
  let newUser = await UserModel.create({ ...data })
  if (!newUser) throw new Error(failErrorMsg)
}
