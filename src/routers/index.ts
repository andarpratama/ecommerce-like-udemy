import {Router, Request, Response} from 'express'
import logging from '../config/logging'
import AuthRoute from './auth.route'
import CourseRoute from './course.route'
import UserRoute from "./user.route";
import IRoute from './IRoute'

class Routes {
   router: Router
   constructor() {
      this.router = Router()
      this.home()
      this.auth()
      this.course()
      this.user()
   }
   
   public home() {
      this.router.get('/', (req: Request, res: Response) => {
         const NAMESPACE:string = 'HOME'
         logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(200).json({msg: 'Welcome.. login to play the game'})
      })
   }

   public auth(): void {
      this.router.use('/auth', AuthRoute)
   }

   public course(): void {
      this.router.use('/courses', CourseRoute)
   }

   public user(): void {
      this.router.use('/user', UserRoute)
   }

}

export default new Routes().router