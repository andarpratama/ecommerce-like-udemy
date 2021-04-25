import {Courses} from '../models/Courses'
import {Request, Response, ErrorRequestHandler} from 'express'

class CourseController {
   static home(req: Request, res: Response, err: ErrorRequestHandler) {
      res.status(200).json({message: 'All Courses..'})
   }

   static create(req: Request, res: Response, err: ErrorRequestHandler) {
      res.status(200).json({message: 'All Courses..'})
   }
}

export default CourseController