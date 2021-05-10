import {Courses} from '../models/Courses'
import { Request, Response, ErrorRequestHandler } from 'express'
import  logging  from "../config/logging";
import { User } from '../models/Users';
import { Category } from '../models/Category';

class CourseController {
   static home(req: Request, res: Response, err: ErrorRequestHandler) {
      res.status(200).json({ message: 'Course / Home'})
   }

   static async getAll(req: Request, res: Response, err: ErrorRequestHandler) {
      try {
         const courses = await Courses.find()
         res.status(200).json({ message: 'Success get all course..', totalData: courses.length, data: courses })
      } catch (err) {
         res.status(200).json({ message: 'Failed get all course..', data: err })
      }
   }

   static async getOne(req: Request, res: Response, err: ErrorRequestHandler) {
      const idCourse = (<any>req).params.idcourse
      
      try {
         const oneCourse = await Courses.findById(idCourse)
         res.status(200).json({ message: 'Success get this one course..', data: oneCourse })
      } catch (err) {
         res.status(200).json({ message: 'Failed get this one course..', data: err })
      }
   }

   static async filter(req: Request, res: Response, err: ErrorRequestHandler) {
      const keyword: string = (<any>req).params.keyword
      
      try {
         let foundCourse = await Courses.find()
         let filterCourse = foundCourse.filter((course) => {
            return course.devCategory === keyword
         })
         
         res.status(200).json({ message: 'Success get this one course..', data: filterCourse })
      } catch (err) {
         res.status(200).json({ message: 'Failed get this one course..', data: err })
      }
   }

   static async create(req: Request, res: Response, err: ErrorRequestHandler) {
      const { title, image, instructor, topic, level, category, devCategory } = req.body
      const price = parseInt(req.body.price)
      const hours = parseInt(req.body.hours)
      const students = parseInt(req.body.students)
      
      const idUser:string = (<any>req).userId
      try {
         const createCourse = await Courses.create({
            title: title,
            image: image,
            instructor: instructor,
            topic: topic,
            level: level,
            category: category,
            price: price,
            hours: hours,
            students: students,
            devCategory: devCategory
          })
         
         logging.info('CREATE COURSE', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(201).json({ msg: 'Creating new courses is success..', data: createCourse })
         
      } catch (err) {
         logging.warn('CREATE COURSE', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         // res.status(500).json({msg: 'Creating new courses is failed..', error: err})  
         console.log(err)
         throw ({name: 'Failed_created'})
      }
   }

}

export default CourseController