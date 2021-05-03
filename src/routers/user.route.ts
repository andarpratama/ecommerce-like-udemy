import { Router } from "express";
import  userController  from "../controllers/user.controller";
import authJwt from "../middlewares/authJwt";

class UserRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.authJWT()
      this.getAll()
      this.userDetail()
   }

   public authJWT(): void {
      this.router.use(authJwt.authentication)
   }

   public info(): void {
      this.router.get('/info/:userID')
   }

   public getAll():void {
      this.router.get('/', userController.home)
   }

   public userDetail(): void {
      this.router.get('/detail', userController.getUserDetail)
   }

}

export default new UserRoute().router