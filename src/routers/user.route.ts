import { Router } from "express";
import  userController  from "../controllers/user.controller";
import authJwt from "../middlewares/authJwt";

class UserRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.auth()
      this.getAll()
      this.userDetail()
   }

   public auth(): void {
      this.router.use(authJwt.authentication)
   }

   public getAll():void {
      this.router.get('/', userController.home)
   }

   public userDetail(): void {
      this.router.get('/detail', userController.getUserDetail)
   }

}

export default new UserRoute().router