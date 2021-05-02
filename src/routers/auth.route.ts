import { Router } from 'express'
import authController from '../controllers/auth.controller'
import IRoute from './IRoute'

class AuthRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.home()
      this.register()
      this.login()
   }

   public home(): void {
      this.router.post('/', authController.home)
   }

   public register(): void {
      this.router.post('/register', authController.register)
   }

   public login(): void {
      this.router.post('/login', authController.login);
   }
}

export default new AuthRoute().router