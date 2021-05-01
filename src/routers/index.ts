import {Router, Request, Response} from 'express'
import logging from '../config/logging'
import AuthRoute from './auth.route'
import CourseRoute from './course.route'
import UserRoute from "./user.route";
import VideoRoute from "./video.route";
import IRoute from './IRoute'
import CartRoute from './cart.route';
import errorHandler from '../middlewares/errorHandler';

class Routes {
   router: Router
   constructor() {
      this.router = Router()
      this.home()
      this.auth()
      this.course()
      this.user()
      this.video()
      this.cart()
      this.errorHandler()
   }
   
   public home() {
      this.router.get('/', (req: Request, res: Response) => {
         const NAMESPACE:string = 'HOME'
         logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(200).json({msg: 'Welcome.. login to get started'})
      })
   }

   public auth(): void {
      this.router.use('/auth', AuthRoute)
   }

   public course(): void {
      this.router.use('/course', CourseRoute)
   }

   public user(): void {
      this.router.use('/user', UserRoute)
   }

   public video(): void {
      this.router.use('/video', VideoRoute)
   }

   public cart(): void {
      this.router.use('/cart', CartRoute)
   }

   public errorHandler(): void{
      this.router.use(errorHandler)
   }

}

export default new Routes().router