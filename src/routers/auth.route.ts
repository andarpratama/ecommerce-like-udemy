import { Router } from 'express'
import authController from '../controllers/auth.controller'
import ErrorHandler from '../middlewares/errorHandler.middleware'
import IRoute from './IRoute'

class AuthRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.home()
      this.register()
      this.login()
      this.errorHandler
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

   public errorHandler(): void {
      this.router.use(ErrorHandler.handleErrors)
   }
}

export default new AuthRoute().router