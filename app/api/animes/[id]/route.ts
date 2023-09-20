import startDB from "@/lib/db"
import AnimeModel from "@/models/animeModel"
import UserModel from "@/models/userModel"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    await startDB()
    if (req.method === "GET") {
      if (!id) {
        return NextResponse.json("ERROR: ID not found")
      }
      let animes = await AnimeModel.find({ user_id: id })

      if (!animes) {
        throw new Error("Failed to update the user's privacy status.")
      }

      return NextResponse.json({ animes })
    }
  } catch (error) {
    return NextResponse.json("ERROR: what happened")
  }
}
