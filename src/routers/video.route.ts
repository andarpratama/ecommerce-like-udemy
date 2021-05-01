import { Router } from 'express'
import VideoController from '../controllers/video.controller'
import authJwt from '../middlewares/authJwt'
import IRoute from './IRoute'

class VideoRoute {
   router: Router
   constructor() {
      this.router = Router()
      // this.auth()
      this.getAll()
      this.create()
      this.getOne()
   }

   public auth(): void {
      this.router.use(authJwt.authentication)
   }

   public getAll(): void {
      this.router.get('/', VideoController.getAll)
   }

   public create(): void {
      this.router.post('/create/:idcourse', VideoController.create)
   }

   public getOne(): void {
      this.router.get('/getone/:idvideo', VideoController.getOne)
   }

}

export default new VideoRoute().router