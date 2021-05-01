import mongoose, { Schema } from 'mongoose'

interface ILevel {
   name: string
}

interface LevelDocument extends mongoose.Document {
   name: string
}

interface LevelModelInterface extends mongoose.Model<LevelDocument> {
   build(attr: ILevel): LevelDocument
}

const lvelSchema = new Schema({
   name: {
      type: String
   }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const Level = mongoose.model<LevelDocument, LevelModelInterface>('Level', lvelSchema)
export { Level }