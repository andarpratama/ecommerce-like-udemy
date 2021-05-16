import { Router } from 'express'
import checkoutController from '../controllers/checkout.controller'
import authJwt from '../middlewares/authJwt'
import IRoute from './IRoute'

class CheckoutRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.home()
      this.add()
   }

   public home(): void {
      this.router.get('/', checkoutController.home)
   }

   public add(): void {
      this.router.post('/add/:courseId', checkoutController.add)
   }

}

export default new CheckoutRoute().router