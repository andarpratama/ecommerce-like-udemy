import { Request, Response, ErrorRequestHandler } from "express";
import logging from "../config/logging";
import { Cart } from "../models/Cart";
import { User } from "../models/Users";

class CheckoutController {

   static home(req: Request, res: Response, err: ErrorRequestHandler) {
      res.status(200).json({ message: 'Checkot / Home'})
   }

   // add course to courseId in schema User
   static async add(req: Request, res: Response, err: ErrorRequestHandler) {
      const { courseId } = req.body
      const idUser:string = (<any>req).userId
      try {
         const pushCourseId = await User.findByIdAndUpdate(idUser, { $push: { 'courseId': courseId } }, { new: true })
         logging.info('ADD COURSE IN CART', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(201).json({ msg: 'Pull new cart is success..', pushCourseId: pushCourseId})
      } catch (err) {
         logging.warn('ADD COURSE IN CART', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(500).json({msg: 'Pull new cart is failed..', error: err})  
      }
   }
}

export default CheckoutController