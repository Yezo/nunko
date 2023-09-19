import { z } from "zod"

//Editing the user settings like name
export const editUserFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
})

//Creating a new user into the database
export const createUserSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required.",
    })
    .email("Email is invalid."),
  password: z
    .string()
    .min(1, {
      message: "Password is required.",
    })
    .min(8, {
      message: "Password must have more than 8 characters.",
    }),
})

//Logging a user in
export const loginUserSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required.",
    })
    .email("Email is invalid."),
  password: z.string().min(8, {
    message: "Password must have more than 8 characters.",
  }),
})