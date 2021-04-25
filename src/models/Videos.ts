import mongoose, { Schema } from 'mongoose'

interface IVideos {
   name: string,
   image: string,
   partId: string[],
   duration: string,
   url: string,
   price: number,
}

interface VideosDocument extends mongoose.Document {
   name: string,
   image: string,
   partId: string[],
   duration: string,
   url: string,
   price: number,
}

interface VideosModelInterface extends mongoose.Model<VideosDocument> {
   build(attr: IVideos): VideosDocument
}

const videoSchema = new Schema({
   name: {
      type: String
   },
   image: {
      type: String
   },
   partId: {
      type: String
   },
   duration: {
      type: String
   },
   ulr: {
      type: String
   }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const Videos = mongoose.model<VideosDocument, VideosModelInterface>('User', videoSchema)
export { Videos }