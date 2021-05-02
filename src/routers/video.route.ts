import { Router } from 'express'
import VideoController from '../controllers/video.controller'
import authJwt from '../middlewares/authJwt'
import IRoute from './IRoute'

class VideoRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.home()
      this.auth()
      this.getAll()
      this.create()
      this.getOne()
   }

   public auth(): void {
      this.router.use(authJwt.authentication)
   }

   public home(): void {
      this.router.get('/', VideoController.home)
   }

   public getAll(): void {
      this.router.get('/getall', VideoController.getAll)
   }

   public create(): void {
      this.router.post('/create/:idcourse', VideoController.create)
   }

   public getOne(): void {
      this.router.get('/getone/:idvideo', VideoController.getOne)
   }

}

export default new VideoRoute().router