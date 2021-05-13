import { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import { User } from "../models/Users";
import bcrypt from 'bcryptjs'
import {IUserAuthorize}  from "../interface/IUser.authorize";

class UserController {
   static home(req:Request, res:Response) {
      res.status(200).json({mgs: 'user/home'})
   }

   static async info(req: IUserAuthorize, res: Response, next: NextFunction) {
      try {
         const foundUser = await User.findOne({
               _id: req.params.userID
         });
         res.status(200).json({
               success: true,
               message: 'User Found',
               data: foundUser,
               status: 'OK',
               statusCode: 200
         });
      } catch (err) {
         next(err);
      }
    }

   static getUserDetail(req: Request, res: Response) {
      const idUser: string = (<any>req).userId
      User.findById(idUser)
         .then((result) => {
            res.status(201).json({msg: 'Detail user..', data: result})
         })
         .catch((err) => {
            res.status(500).json({msg: 'Failed show detail user..', error: err})
         })
   }

   static updateUser(req:Request, res:Response) {
     const idUser:any = (<any>req).userId
     const { name, email, password } = req.body;
     
     const updateData:any = { name, email, password };
     
     for (const item in updateData) {
      //   if (updateData[item] === updateData['password']) {
      //      updateData[item] = bcrypt.hashSync(updateData[item], 8);
      //   }
        if (!updateData[item]) {
           delete updateData[item]
        }
     }
     
    User.findByIdAndUpdate(idUser, updateData, { new: true })
      .then((result) => {
        res.status(200).json({ msg: 'Success update the user', data: result });
      })
      .catch((err) => {
        res.status(500).json({ msg: 'Failed update the user' });
      });
   }
   
}

export default UserController