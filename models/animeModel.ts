import { Model, model, models } from "mongoose"
import { Document, Schema } from "mongoose"

export interface AnimeDocument extends Document {
  type: "anime" | "manga"
  mal_id: number
  title: string
  status: "Watching" | "Planned" | "Completed" | "Hiatus" | "Paused" | "Dropped"
  score: number
  progress: number
  user_id: string
}

const animeSchema = new Schema<AnimeDocument, {}>(
  {
    type: { type: String, enum: ["anime", "manga"], required: true },
    mal_id: { type: Number, required: true },
    title: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["Watching", "Planned", "Completed", "Hiatus", "Dropped", "Paused"],
      required: true,
    },
    score: { type: Number, required: true },
    progress: { type: Number, required: true },
    user_id: { type: String, required: true },
  },
  { timestamps: true }
)

const AnimeModel = models.Anime || model("Anime", animeSchema)
export default AnimeModel as Model<AnimeDocument, {}>
