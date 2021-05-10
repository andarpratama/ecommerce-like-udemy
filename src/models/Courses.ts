import mongoose, { Schema } from 'mongoose'
import { ICourse } from "../interface/ICourse";
import { CourseDocument } from "../interface/ICourse.mongoose";

interface CourseModelInterface extends mongoose.Model<CourseDocument> {
   build(attr: ICourse): CourseDocument
}

const courseSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   image: {
      type: String,
      required: true
   },
   instructor: {
      type: String,
      required: true
   },
   topic: {
      type: String,
      required: true
   },
   level: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   hours: {
      type: Number,
      required: true
   },
   students: {
      type: Number,
      required: true
   },
   category: {
      type: String,
      required: true
   },
   devCategory: {
      type: String,
      required: true
   }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const Courses = mongoose.model<CourseDocument, CourseModelInterface>('Courses', courseSchema)
export { Courses }