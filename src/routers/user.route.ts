import { Router } from "express";
import userController  from "../controllers/user.controller";
import authJwt from "../middlewares/authJwt";

class UserRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.infoNoAuth()
      this.authJWT()
      this.info()
      this.getAll()
      this.userDetail()
      this.update()
   }

   public authJWT(): void {
      this.router.use(authJwt.authentication)
   }

   public info(): void {
      this.router.get('/info/:userID', userController.info)
   }

   public infoNoAuth(): void {
      this.router.get('/noauth/info/:userID', userController.info)
   }

   public getAll():void {
      this.router.get('/', userController.home)
   }

   public userDetail(): void {
      this.router.get('/detail', userController.getUserDetail)
   }

   public update(): void {
      this.router.get('/update', userController.update)
   }

}

export default new UserRoute().router