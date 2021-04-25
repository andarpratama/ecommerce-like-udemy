import { Router } from 'express'
import courseController from '../controllers/course.controller'
import IRoute from './IRoute'

class CourseRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.home()
      this.create()
   }

   public home(): void {
      this.router.get('/', courseController.home)
   }

   public create(): void {
      this.router.post('/create', courseController.create)
   }
}

export default new CourseRoute().router