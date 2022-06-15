import { Router, Request, Response } from 'express';
import logging from '../config/logging';
import CourseRoute from './course.route';
import UserRoute from './user.route';
import CartRoute from './cart.route';
import CheckoutRoute from './checkout.route';
import ErrorHandler from '../middlewares/errorHandler.middleware';
import authRoute from './auth.route';
import IRoute from './IRoute';

class Routes {
  router: Router;
  constructor() {
    this.router = Router();
    this.home();
    this.auth();
    this.course();
    this.user();
    this.cart();
    this.checkout();
    this.errorHandler();
  }

  public home() {
    this.router.get('/', (req: Request, res: Response) => {
      res.status(200).json({
        message: 'Welcome to the Ecommerce Like Udemy API',
        title: 'Ecommerce Like Udemy',
        author: 'Andar Pratama',
        detail_author: 'https://ecommerce-like-udemy.herokuapp.com/author',
        version: 2.0,
        repo: 'https://github.com/andarpratama/ecommerce-like-udemy',
        slide: 'https://bit.ly/3kuAjqY',
      });
    });

    this.router.get('/author', (req: Request, res: Response) => {
      res.status(200).json({
        name: 'Andar Pratama',
        address: 'Tangerang',
        phone: '081283699257',
        education: 'Bachelor Degree in Informatics Enginering',
        instagram: '@andar.pratama_',
        github: 'https://github.com/andarpratama',
        linkedin: 'https://www.linkedin.com/in/andarpratama/',
      });
    });
  }

  public auth(): void {
    this.router.use('/auth', authRoute);
  }

  public course(): void {
    this.router.use('/course', CourseRoute);
  }

  public user(): void {
    this.router.use('/user', UserRoute);
  }

  public cart(): void {
    this.router.use('/cart', CartRoute);
  }

  public checkout(): void {
    this.router.use('/checkout', CheckoutRoute);
  }

  public errorHandler(): void {
    this.router.use(ErrorHandler.handleErrors);
  }
}

export default new Routes().router;
