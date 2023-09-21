import { Model, model, models } from "mongoose"
import { Document, Schema } from "mongoose"

export interface MangaDocument extends Document {
  type: "anime" | "manga"
  mal_id: number
  title: string
  status: "Reading" | "Planned" | "Completed" | "Hiatus" | "Paused" | "Dropped"
  score: string
  progress: string
  user_id: string
  image: string
  chapters: number
  publishingStatus: string
}

const mangaSchema = new Schema<MangaDocument, {}>(
  {
    type: { type: String, enum: ["anime", "manga"], required: true },
    mal_id: { type: Number, required: true },
    title: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["Reading", "Planned", "Completed", "Hiatus", "Dropped", "Paused"],
      required: true,
    },
    score: { type: String, required: true },
    progress: { type: String, required: true },
    user_id: { type: String, required: true },
    image: { type: String, required: true },
    chapters: { type: Number, default: 0 },
    publishingStatus: { type: String, required: true },
  },
  { timestamps: true }
)

const MangaModel = models.Manga || model("Manga", mangaSchema)
export default MangaModel as Model<MangaDocument, {}>
