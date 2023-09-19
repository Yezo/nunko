import { DefaultSession } from "next-auth"

//Registers "id" as a proper type for useSession
declare module "next-auth" {
  interface Session {
    user?: {
      id?: string
      role?: "user" | "admin"
      privacy?: "public" | "hidden"
      avatar?: string
    } & DefaultSession["user"]
  }
}
