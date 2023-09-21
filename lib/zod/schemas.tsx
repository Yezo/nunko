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

//Adding anime entry
export const createAnimeEntrySchema = z.object({
  type: z.string().min(1, {
    message: "Type is required.",
  }),
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  mal_id: z.number().min(1, {
    message: "ID is required.",
  }),
  status: z.string().min(1, {
    message: "Status is required.",
  }),
  score: z.string(),
  progress: z.string(),
  user_id: z.string().min(1, {
    message: "ID is required.",
  }),
  image: z.string().min(1, {
    message: "Image is required.",
  }),
  airingStatus: z.string().min(1, {
    message: "Airing Status is required.",
  }),
  episodes: z.number(),
})

//Editing manga entry
export const createMangaEntrySchema = z.object({
  type: z.string().min(1, {
    message: "Type is required.",
  }),
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  mal_id: z.number().min(1, {
    message: "ID is required.",
  }),
  status: z.string().min(1, {
    message: "Status is required.",
  }),
  score: z.string(),
  progress: z.string(),
  user_id: z.string(),
  image: z.string().min(1, {
    message: "Image is required.",
  }),
  publishingStatus: z.string().min(1, {
    message: "Airing Status is required.",
  }),
  chapters: z.number(),
})
