import { Model, model, models } from "mongoose"
import { Document, Schema } from "mongoose"

export interface AnimeDocument extends Document {
  type: "anime" | "manga"
  mal_id: number
  title: string
  status: "Watching" | "Planned" | "Completed" | "Hiatus" | "Paused" | "Dropped"
  score: string
  progress: string
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
    score: { type: String, required: true },
    progress: { type: String, required: true },
    user_id: { type: String, required: true },
  },
  { timestamps: true }
)

const AnimeModel = models.Anime || model("Anime", animeSchema)
export default AnimeModel as Model<AnimeDocument, {}>
