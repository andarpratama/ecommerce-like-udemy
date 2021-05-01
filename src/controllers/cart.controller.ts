import { Request, Response, ErrorRequestHandler } from "express";
import logging from "../config/logging";
import { Cart } from "../models/Cart";

class CartController {

   static getAll(req:Request, res: Response, err: ErrorRequestHandler) {
      res.status(200).json({msg: 'Gell all cart'})
   }

   static async create(req: Request, res: Response, err: ErrorRequestHandler) {
      const { userId, courseId, coupon } = req.body
      try {
         const newCart = await Cart.create({ userId, courseId, coupon })
         logging.info('CREATE CART', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(201).json({ msg: 'Creating new cart is success..', newCart: newCart})
         
      } catch (err) {
         logging.warn('CREATE CART', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(500).json({msg: 'Creating new cart is failed..', error: err})  
      }
   }

}

export default CartController