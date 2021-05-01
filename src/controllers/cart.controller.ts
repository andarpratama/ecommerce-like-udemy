import { Request, Response, ErrorRequestHandler } from "express";
import logging from "../config/logging";
import { Cart } from "../models/Cart";

class CartController {

   static async getAll(req:Request, res: Response, err: ErrorRequestHandler) {
      try {
         const allCart = await Cart.find()
         logging.info('GET ALL CART', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(201).json({ msg: 'Creating new cart is success..', allCart: allCart})
         
      } catch (err) {
         logging.warn('GET ALL CART', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(500).json({msg: 'Creating new cart is failed..', error: err})  
      }
   }

   static async create(req: Request, res: Response, err: ErrorRequestHandler) {
      const { courseId } = req.body
      const idUser:string = (<any>req).userId
      try {
         const newCart = await Cart.create({ idUser })
         const pushCourseID = await Cart.findByIdAndUpdate(newCart?.id, { $push: { 'courseId': courseId } }, { new: true })
         logging.info('ADD COURSE IN CART', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(201).json({ msg: 'Push new course is success..', pushCourseID: pushCourseID})
         
      } catch (err) {
         logging.warn('ADD COURSE IN CART', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(500).json({msg: 'Push new course is failed..', error: err})  
      }
   }

   static async delete(req: Request, res: Response, err: ErrorRequestHandler) {
      const { courseId } = req.params
      const idUser:string = (<any>req).userId
      try {
         const pullCourseId = await Cart.findByIdAndUpdate(courseId, { $pull: { 'courseId': courseId } }, { new: true })
         logging.info('DELETE COURSE IN CART', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(201).json({ msg: 'Pull new cart is success..',})
         
      } catch (err) {
         logging.warn('DELETE COURSE IN CART', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(500).json({msg: 'Pull new cart is failed..', error: err})  
      }
   }

}

export default CartController