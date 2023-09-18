import startDB from "@/lib/db"
import UserModel from "@/models/userModel"
import { NextResponse } from "next/server"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    await startDB()
    if (req.method === "PUT") {
      if (!id) {
        return { error: "ID not found" }
      }
      const newName = await req.json()
      const update = { name: newName.name }

      if (!newName || !newName.name) {
        return NextResponse.json({ error: "New name is required." })
      }
      const updatedUser = await UserModel.findByIdAndUpdate(id, update, { new: true })
      if (!updatedUser) {
        return NextResponse.json({ error: "Failed to update user." })
      }
      return NextResponse.json({ updatedUser })
    }
  } catch (error) {
    return NextResponse.json({ error })
  }

  return NextResponse.json({ id })
}
