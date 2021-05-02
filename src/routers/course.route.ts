import { Router } from 'express'
import courseController from '../controllers/course.controller'
import authJwt from '../middlewares/authJwt'
import IRoute from './IRoute'

class CourseRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.home()
      this.auth()
      this.getAll()
      this.getOne()
      this.create()
      this.pushtouser()
      this.pulltouser()
      this.addCategory()
      this.addTopic()
      this.addLevel()
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

   public pushtouser(): void {
      this.router.post('/push/:idcourse', courseController.pushToUser)
   }

   public pulltouser(): void {
      this.router.post('/pull/:idcourse', courseController.pullToUser)
   }

   public addCategory(): void {
      this.router.post('/category/add/:idcourse', courseController.addCategory)
   }

   public addTopic(): void {
      this.router.post('/topic/add/:idcourse', courseController.addTopic)
   }

   public addLevel(): void {
      this.router.post('/topic/add/:idcourse', courseController.addLevel)
   }

}

export default new CourseRoute().router