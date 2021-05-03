import mongoose, { Schema } from 'mongoose'

interface ICart {
   userId: string,
   courseId: string[],
   coupon: string
}

interface CartDocument extends mongoose.Document {
   userId: string,
   courseId: string[],
   coupon: string
}

interface CartModelInterface extends mongoose.Model<CartDocument> {
   build(attr: ICart): CartDocument
}

const cartSchema = new Schema({
   userId: {
      type: mongoose.Types.ObjectId, ref: 'User'
   },
   courseId: [{
      type: mongoose.Types.ObjectId, ref: 'Courses'
   }],
   coupon: {
      type: String
   },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const Cart = mongoose.model<CartDocument, CartModelInterface>('Cart', cartSchema)
export { Cart }