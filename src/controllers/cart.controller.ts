import { Request, Response, ErrorRequestHandler } from "express";
import logging from "../config/logging";
import { Cart } from "../models/Cart";
import { User } from "../models/Users";

class CartController {

   static home(req: Request, res: Response, err: ErrorRequestHandler) {
      res.status(200).json({ message: 'Cart / Home'})
   }

   static async add(req: Request, res: Response, err: ErrorRequestHandler) {
      const { courseId } = req.params
      const { userId } = req.body
      try {
         const pushCourseId = await User.findByIdAndUpdate(userId, { $push: { 'cartId': courseId } }, { new: true })
         // const pushCourseId = await User.findById(idUser)
         logging.info('ADD COURSE IN CART', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(201).json({ msg: 'Pull new cart is success..', pushCourseId: pushCourseId})
      } catch (err) {
         logging.warn('ADD COURSE IN CART', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(500).json({msg: 'Pull new cart is failed..', error: err})  
      }
   }

   static async delete(req: Request, res: Response, err: ErrorRequestHandler) {
      const { courseId } = req.params
      const { userId } = req.body
      try {
         const pullCourseId = await User.findByIdAndUpdate(userId, { $pull: { 'cartId': courseId } }, { new: true })
         logging.info('DELETE COURSE IN CART', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(201).json({ msg: 'Pull new cart is success..',})
         
      } catch (err) {
         logging.warn('DELETE COURSE IN CART', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(500).json({msg: 'Pull new cart is failed..', error: err})  
      }
   }

}

export default CartController