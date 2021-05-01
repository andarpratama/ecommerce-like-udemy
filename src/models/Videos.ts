import mongoose, { Schema } from 'mongoose'

interface IVideos {
   name: string,
   url: string
}

interface VideosDocument extends mongoose.Document {
   name: string,
   url: string
}

interface VideosModelInterface extends mongoose.Model<VideosDocument> {
   build(attr: IVideos): VideosDocument
}

const videoSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   url: {
      type: String,
      required: true
   }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const Videos = mongoose.model<VideosDocument, VideosModelInterface>('Videos', videoSchema)
export { Videos }