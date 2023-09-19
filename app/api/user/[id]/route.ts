import startDB from "@/lib/db"
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
      let user = await UserModel.findOne({ _id: id })

      if (!user) {
        throw new Error("Failed to update the user's privacy status.")
      }

      return NextResponse.json({ user })
    }
  } catch (error) {
    return NextResponse.json("ERROR: what happened")
  }
}
