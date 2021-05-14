import { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import { User } from "../models/Users";
import bcrypt from 'bcryptjs'
import { IUserAuthorize } from "../interface/IUser.authorize";
import validator from 'validator'

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

   static async update(req: IUserAuthorize, res: Response, next: NextFunction) {
        try {
           if (
              !req.body.name ||
              !req.body.email ||
              !req.body.password ||
              !req.body.image ||
              !req.body.address ||
              !req.body.city ||
              !req.body.telp
            ) {
                throw { name: 'All Input Required' };
            }
            if (!validator.isEmail(req.body.email)) {
                throw { name: 'Invalid Email' };
            }
            const editUser:any = {
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 8),
                image: req.body.image,
                address: req.body.address,
                city: req.body.city,
                telp: req.body.telp
            };
            for (const key in editUser) {
                if (!editUser[key]) {
                    delete editUser[key];
                }
            }
            await User.findOneAndUpdate(
                { _id: req.params.userID },
                editUser,
                {
                    new: true
                }
            );
            res.status(200).json({
                success: true,
                message: 'Successfully edit user info',
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }
}

export default UserController