import {Courses} from '../models/Courses'
import { Request, Response, ErrorRequestHandler } from 'express'
import  logging  from "../config/logging";
import { User } from '../models/Users';
import { Category } from '../models/Category';
import { Topic } from '../models/Topic';
import { Level } from '../models/Level';

class CourseController {
   static async getAll(req: Request, res: Response, err: ErrorRequestHandler) {
      try {
         const oneCourse = await Courses.find()
         res.status(200).json({ message: 'Success get all course..', data: oneCourse })
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

   static async create(req: Request, res: Response, err: ErrorRequestHandler) {
      const {title, subtitle, image, description} = req.body
      const idUser:string = (<any>req).userId
      try {
         const createCourse = await Courses.create({ title, subtitle, image, description })
         
         logging.info('CREATE COURSE', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(201).json({ msg: 'Creating new courses is success..', data: createCourse })
         
      } catch (err) {
         logging.warn('CREATE COURSE', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(500).json({msg: 'Creating new courses is failed..', error: err})  
      }
   }
   
   static async pushToUser(req: Request, res: Response, err: ErrorRequestHandler) {
      const idUser: string = (<any>req).userId
      const idCourse = (<any>req).params.idcourse
      User.findByIdAndUpdate(idUser, {$push: {'courseId': idCourse}}, {new: true})
         .then((updatedUser:any)=>{
            res.status(200).json({msg: 'Success push to user..', data: updatedUser})
         })
         .catch((err)=> res.status(500).json({msg: 'Failed push to user..', data: err}))
   }

   static async pullToUser(req: Request, res: Response, err: ErrorRequestHandler) {
      const idUser: string = (<any>req).userId
      const idCourse = (<any>req).params.idcourse
      User.findByIdAndUpdate(idUser, {$pull: {'courseId': idCourse}}, {new: true})
         .then((updatedUser:any)=>{
            res.status(200).json({msg: 'Success pull to user..', data: updatedUser})
         })
         .catch((err)=> res.status(500).json({msg: 'Failed pull to user..', data: err}))
   }
      

   static async addCategory(req: Request, res: Response, err: ErrorRequestHandler) {
      const idCourse = (<any>req).params.idcourse
      const {name} = req.body

      try {
         const newCategory = await Category.create({ name })
         const pushedCategory = await Courses.findByIdAndUpdate(idCourse, {$push: {'categoryId': newCategory.id}}, {new: true})
         res.status(200).json({ msg: 'Success add category..', newCategory: newCategory, pushedCategory: pushedCategory})
      } catch (err) {
         res.status(200).json({ msg: 'Failed add category..', data: err })
      }
   }

   static async addTopic(req: Request, res: Response, err: ErrorRequestHandler) {
      const idCourse = (<any>req).params.idcourse
      const {name} = req.body

      try {
         const newTopic = await Topic.create({ name })
         const pushedTopic = await Courses.findByIdAndUpdate(idCourse, {$push: {'topicId': newTopic.id}}, {new: true})
         res.status(200).json({ msg: 'Success add topic..', newTopic: newTopic, pushedTopic: pushedTopic})
      } catch (err) {
         res.status(200).json({ msg: 'Failed add topic..', data: err })
      }
   }

   static async addLevel(req: Request, res: Response, err: ErrorRequestHandler) {
      const idCourse = (<any>req).params.idcourse
      const {name} = req.body

      try {
         const newLevel = await Level.create({ name })
         const pushedLevel = await Courses.findByIdAndUpdate(idCourse, {$push: {'levelId': newLevel.id}}, {new: true})
         res.status(200).json({ msg: 'Success add level..', newLevel: newLevel, pushedLevel: pushedLevel})
      } catch (err) {
         res.status(200).json({ msg: 'Failed add level..', data: err })
      }
   }

}

export default CourseController