import mongoose, { Schema } from 'mongoose'

interface ICategory {
   name: string
}

interface CategoryDocument extends mongoose.Document {
   name: string
}

interface CategoryModelInterface extends mongoose.Model<CategoryDocument> {
   build(attr: ICategory): CategoryDocument
}

const categorySchema = new Schema({
   name: {
      type: String
   }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const Category = mongoose.model<CategoryDocument, CategoryModelInterface>('Category', categorySchema)
export { Category }