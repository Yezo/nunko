import startDB from "@/lib/db"
import AnimeModel from "@/models/animeModel"
import MangaModel from "@/models/mangaModel"
import UserModel from "@/models/userModel"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  await startDB()
  if (req.method === "GET") {
    // Function to find all users with "privacy" set to "public"
    async function findPublicUsers() {
      try {
        const publicUsers = await UserModel.find({ privacy: "public" })
        return publicUsers
      } catch (error) {
        throw new Error("Error finding public users: " + error)
      }
    }

    // Function to get all anime entries for a user by their username
    async function getAnimeEntriesForUser(username: string) {
      try {
        const animeEntries = await AnimeModel.find({ username })
        return animeEntries
      } catch (error) {
        throw new Error("Error getting anime entries for user: " + error)
      }
    }

    // Function to get all anime entries for a user by their username
    async function getMangaEntriesForUser(username: string) {
      try {
        const mangaEntries = await MangaModel.find({ username })
        return mangaEntries
      } catch (error) {
        throw new Error("Error getting manga entries for user: " + error)
      }
    }

    // Function to retrieve anime entries for all public users
    async function getAllPublicEntries() {
      try {
        const publicUsers = await findPublicUsers()
        const animeEntries = []
        const mangaEntries = []

        for (const user of publicUsers) {
          const userAnimeEntries = await getAnimeEntriesForUser(user.name)
          animeEntries.push(...userAnimeEntries)

          const userMangaEntries = await getMangaEntriesForUser(user.name)
          mangaEntries.push(...userMangaEntries)
        }

        const allEntries = [...animeEntries, ...mangaEntries]

        return allEntries
      } catch (error) {
        throw new Error("Error getting all public anime entries: " + error)
      }
    }

    const entries = await getAllPublicEntries()
    if (!entries) throw new Error("Failed to find all public entries.")
    //   let user = await UserModel.find({ privacy: "public" }).collation({
    //     locale: "en",
    //     strength: 2,
    //   })
    //   if (!user) throw new Error("Failed to find a user with this username.")

    //   let animes = await AnimeModel.find({ user_id: user._id.toString() }).collation({
    //     locale: "en",
    //     strength: 2,
    //   })
    return NextResponse.json({ entries })
  }
}
