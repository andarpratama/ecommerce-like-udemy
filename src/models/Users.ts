import mongoose, { Mongoose, Schema } from 'mongoose'
import { IUser } from "../interface/IUser";
import { UserDocument } from "../interface/IUser.mongoose";

interface UserModelInterface extends mongoose.Model<UserDocument> {
   build(attr: IUser): UserDocument
}

const userSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   image: {
      type: String,
   },
   address: {
      type: String,
   },
   city: {
      type: String
   },
   telp: {
      type: String
   },
   cardId: [{
      type: mongoose.Types.ObjectId, ref: 'Cart'
   }],
   courseId: [{
      type: mongoose.Types.ObjectId, ref: 'Course'
   }],
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const User = mongoose.model<UserDocument, UserModelInterface>('User', userSchema)
export {User}