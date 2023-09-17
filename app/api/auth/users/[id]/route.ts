import startDB from "@/lib/db"
import UserModel from "@/models/userModel"
import { NextResponse } from "next/server"

interface NewUserRequest {
  name: string
  email: string
  password: string
}

interface NewUserResponse {
  id: string
  name: string
  email: string
  role: string
}
type NewResponse = NextResponse<{ user?: NewUserResponse; error?: string }>

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  //ID of session user
  const id = params.id
  try {
    await startDB()
    if (req.method === "PUT") {
      if (!id) {
        return { error: "ID not found" }
      }
      const user = await UserModel.findById(id)
      const newName = await req.json()
      const oldName = user && user.name
      const filter = { name: oldName }
      const update = { name: newName.name }
      const updatedUser = await UserModel.findOneAndUpdate(filter, update, {
        new: true,
      })
      return NextResponse.json({ updatedUser })
    }
  } catch (error) {
    return NextResponse.json({ error })
  }
  return NextResponse.json({ id })
}
