import { Router } from 'express'
import CartController from '../controllers/cart.controller'
import authJwt from '../middlewares/authJwt'
import IRoute from './IRoute'

class CartRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.auth()
      this.getAll()
      this.create()
      this.delete()
   }

   public auth(): void {
      this.router.use(authJwt.authentication)
   }

   public getAll(): void {
      this.router.get('/', CartController.getAll)
   }

   public create(): void {
      this.router.post('/create', CartController.create)
   }

   public delete(): void {
      this.router.post('/delete/:courseId', CartController.delete)
   }

}

export default new CartRoute().router