import { Model, model, models } from "mongoose"
import { Document, Schema } from "mongoose"

export interface AnimeDocument extends Document {
  type: "TV" | "Movie" | "Special" | "OVA" | 'ONA" | "Music'
  mal_id: number
  title: string
  status: "Watching" | "Planned" | "Completed" | "Hiatus" | "Paused" | "Dropped"
  score: string
  progress: string
  user_id: string
  image: string
  episodes: number
  airingStatus: string
  username: string
  duration: string
  airDate: string
}

const animeSchema = new Schema<AnimeDocument, {}>(
  {
    type: {
      type: String,
      enum: ["TV", "Movie", "Special", "OVA", "ONA", "Music"],
      required: true,
    },
    mal_id: { type: Number, required: true },
    title: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["Watching", "Planned", "Completed", "Hiatus", "Dropped", "Paused"],
      required: true,
    },
    score: { type: String, required: true },
    username: { type: String, required: true },
    progress: { type: String, required: true },
    user_id: { type: String, required: true },
    image: { type: String, required: true },
    episodes: { type: Number, default: 0 },
    airingStatus: { type: String, required: true },
    duration: { type: String, required: true },
    airDate: { type: String, required: true },
  },
  { timestamps: true }
)

const AnimeModel = models.Anime || model("Anime", animeSchema)
export default AnimeModel as Model<AnimeDocument, {}>
