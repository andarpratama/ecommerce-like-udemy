import { Document } from "mongoose";

interface ICart extends Document {
   title: string,
   image: string,
   topic: string,
   level: string,
   price: number,
   hours: number,
   students: number,
   instructor: string,
   category: string,
}

export {ICart}