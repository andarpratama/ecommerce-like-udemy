import { Router } from 'express'
import courseController from '../controllers/course.controller'
import authJwt from '../middlewares/authJwt'
import IRoute from './IRoute'

class CourseRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.home()
      this.create()
      this.getAll()
      this.getOne()
      this.auth()
   }

   public auth(): void {
      this.router.use(authJwt.authentication)
   }

   public home(): void {
      this.router.get('/', courseController.home)
   }

   public getAll(): void {
      this.router.get('/getall', courseController.getAll)
   }

   public getOne(): void {
      this.router.get('/getone/:idcourse', courseController.getOne)
   }

   public create(): void {
      this.router.post('/create', courseController.create)  
   }

}

export default new CourseRoute().router