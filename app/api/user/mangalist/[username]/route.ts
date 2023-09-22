import startDB from "@/lib/db"
import MangaModel from "@/models/mangaModel"
import UserModel from "@/models/userModel"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { username: string } }) {
  const username = params.username

  try {
    await startDB()
    if (req.method === "GET") {
      if (!username) return NextResponse.json("Username was not given.")

      let user = await UserModel.findOne({ name: username }).collation({
        locale: "en",
        strength: 2,
      })
      if (!user) throw new Error("Failed to find a user with this username.")

      let mangas = await MangaModel.find({ user_id: user._id.toString() }).collation({
        locale: "en",
        strength: 2,
      })
      return NextResponse.json({ mangas })
    }
  } catch (error) {
    return NextResponse.json("ERROR: what happened")
  }
}
