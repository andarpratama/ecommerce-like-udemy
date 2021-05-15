import {Router, Request, Response} from 'express'
import logging from '../config/logging'
import CourseRoute from './course.route'
import UserRoute from "./user.route";
import IRoute from './IRoute'
import CartRoute from './cart.route';
import ErrorHandler from '../middlewares/errorHandler.middleware';
import authRoute from './auth.route';

class Routes {
   router: Router
   constructor() {
      this.router = Router()
      this.home()
      // this.auth()
      this.course()
      this.user()
      this.cart()
      this.errorHandler()
   }
   
   public home() {
      this.router.get('/', (req: Request, res: Response) => {
         const NAMESPACE:string = 'HOME'
         // logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(200).json({msg: 'Welcome.. login to get started'})
      })
   }

   public auth(): void {
      this.router.use('/auth', authRoute)
   }

   public course(): void {
      this.router.use('/course', CourseRoute)
   }

   public user(): void {
      this.router.use('/user', UserRoute)
   }

   public cart(): void {
      this.router.use('/cart', CartRoute)
   }

   public errorHandler(): void {
      this.router.use(ErrorHandler.handleErrors)
   }

}

export default new Routes().router