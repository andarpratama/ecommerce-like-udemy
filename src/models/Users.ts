import mongoose, { Mongoose, Schema } from 'mongoose'

interface IUser {
   name: string,
   username: string,
   email: string,
   password: string,
   image: string,
   address: string,
   city: string,
   telp: string,
   wishlist: string[],
   cartId: string[],
}

interface UserDocument extends mongoose.Document {
   name: string,
   username: string,
   email: string,
   password: string,
   image: string,
   address: string,
   city: string,
   telp: string,
   wishlist: string[],
   cartId: string[],
}

interface UserModelInterface extends mongoose.Model<UserDocument> {
   build(attr: IUser): UserDocument
}

const userSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   username: {
      type: String,
      required: true,
      unique: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   image: {
      type: String,
   },
   addressId: [{
      type: mongoose.Types.ObjectId, ref: 'Address'
   }],
   city: {
      type: String
   },
   telp: {
      type: String
   },
   wishlistId: [{
      type: mongoose.Types.ObjectId, ref: 'Wishlist'
   }],
   cardId: [{
      type: mongoose.Types.ObjectId, ref: 'Wishlist'
   }],
   logBuy: [{
      type: mongoose.Types.ObjectId, ref: 'Logbuy'
   }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const User = mongoose.model<UserDocument, UserModelInterface>('User', userSchema)
export {User}