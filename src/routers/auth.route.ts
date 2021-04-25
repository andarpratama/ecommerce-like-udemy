import { Router } from 'express'
import authController from '../controllers/auth.controller'
import IRoute from './IRoute'

class AuthRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.register()
   }

   public register(): void {
      this.router.post('/register', authController.register)
   }
}

export default new AuthRoute().router