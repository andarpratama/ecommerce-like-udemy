import mongoose, { Schema } from 'mongoose'

interface ICourse {
   title: string,
   subtitle: string,
   image: string,
   description: string,
   videosId: string[],
   listOfLearnId: string[],
   rattingsId: string[],
   reviewsId: string[],
   instructorId: string[],
   requirementId: string[],
   commentsId: string[],
   categoryId: string[],
}

interface CourseDocument extends mongoose.Document {
   title: string,
   subtitle: string,
   image: string,
   description: string,
   videosId: string[],
   listOfLearnId: string[],
   rattingsId: string[],
   reviewsId: string[],
   instructorId: string[],
   requirementId: string[],
   commentsId: string[],
   categoryId: string[],
}

interface CourseModelInterface extends mongoose.Model<CourseDocument> {
   build(attr: ICourse): CourseDocument
}

const courseSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   subtitle: {
      type: String,
      required: true
   },
   image: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   Instructor: {
      type: mongoose.Types.ObjectId,
      ref: 'Instructor'
   },
   videosId: [{
      type: mongoose.Types.ObjectId,
      ref: 'Videos'
   }],
   listOfLearnId: [{
      type: mongoose.Types.ObjectId,
      ref: 'Listoflearn'
   }],
   rattingsId: [{
      type: mongoose.Types.ObjectId,
      ref: 'Rattings'
   }],
   reviewsId: [{
      type: mongoose.Types.ObjectId,
      ref: 'Reviews'
   }],
   requiermentsId: [{
      type: mongoose.Types.ObjectId,
      ref: 'Requirements'
   }],
   commentsId: [{
      type: mongoose.Types.ObjectId,
      ref: 'Comments'
   }],
   categoryId: [{
      type: mongoose.Types.ObjectId,
      ref: 'Categories'
   }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const Courses = mongoose.model<CourseDocument, CourseModelInterface>('Courses', courseSchema)
export { Courses }