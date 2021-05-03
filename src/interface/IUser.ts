import { Document } from "mongoose";

interface IUser extends Document {
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

export {IUser}