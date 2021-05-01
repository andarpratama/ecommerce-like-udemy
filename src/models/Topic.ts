import mongoose, { Schema } from 'mongoose'

interface ITopic {
   name: string
}

interface TopicDocument extends mongoose.Document {
   name: string
}

interface TopicModelInterface extends mongoose.Model<TopicDocument> {
   build(attr: ITopic): TopicDocument
}

const topicSchema = new Schema({
   name: {
      type: String
   }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const Topic = mongoose.model<TopicDocument, TopicModelInterface>('Topic', topicSchema)
export { Topic }