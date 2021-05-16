import { Router } from 'express'
import CartController from '../controllers/cart.controller'
import authJwt from '../middlewares/authJwt'
import IRoute from './IRoute'

class CartRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.home()
      this.addNoAuth()
      this.deleteNoAuth()
      this.authJWT()
      this.add()
      this.delete()
   }

   public authJWT(): void {
      this.router.use(authJwt.authentication)
   }

   public home(): void {
      this.router.get('/', CartController.home)
   }

   public add(): void {
      this.router.post('/add/:courseId', CartController.add)
   }

   public addNoAuth(): void {
      this.router.post('/add/noauth/:courseId', CartController.add)
   }

   public delete(): void {
      this.router.post('/delete/:courseId', CartController.delete)
   }

   public deleteNoAuth(): void {
      this.router.post('/delete/noauth/:courseId', CartController.delete)
   }

}

export default new CartRoute().router