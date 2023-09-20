import startDB from "@/lib/db"
import MangaModel from "@/models/mangaModel"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    await startDB()
    if (req.method === "GET") {
      if (!id) {
        return NextResponse.json("ERROR: ID not found")
      }
      let mangas = await MangaModel.find({ user_id: id })

      if (!mangas) {
        throw new Error("Failed to update the user's privacy status.")
      }

      return NextResponse.json({ mangas })
    }
  } catch (error) {
    return NextResponse.json("ERROR: what happened")
  }
}
