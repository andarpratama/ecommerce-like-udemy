import { Router } from "express";
import  userController  from "../controllers/user.controller";

class UserRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.getone()
   }

   public getone():void {
      this.router.get('/', userController.home)
   }
}

export default new UserRoute().router