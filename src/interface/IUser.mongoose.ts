import mongoose from 'mongoose'

interface UserDocument extends mongoose.Document {
   name: string,
   email: string,
   password: string,
   image: string,
   address: string,
   city: string,
   telp: string,
   cartId: string[],
   courseId: string[],
}

export {UserDocument}