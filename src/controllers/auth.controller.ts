import {User} from '../models/Users'
import {Request, Response, ErrorRequestHandler, NextFunction} from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import logging from '../config/logging'
import { IUserAuthorize } from '../interface/IUser.authorize';
import validator from 'validator'

class Auth {
   constructor() {
      dotenv.config()
   }

   static home(req: Request, res: Response, err: ErrorRequestHandler) {
      res.status(200).json({ message: 'Auth / Home'})
   }

   static async register(req: Request, res: Response, next: NextFunction) {
      try {
            if (!req.body.name || !req.body.email) {
               throw { name: 'Name and Email Required' };
            }
            if (!validator.isEmail(req.body.email)) {
               throw { name: 'Invalid Email' };
            }
            if (!req.body.password) {
                throw { name: 'Password Required' };
            }
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 8)
            });
            await newUser.save();
            res.status(201).json({
                success: true,
                message: 'Success Registration',
                status: 'Created',
                statusCode: 201
            });
        } catch (err) {
            next(err);
        }
    }


   static async login(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.body.email) {
                throw { name: 'Email is Required' };
            }
            
            if (!validator.isEmail(req.body.email)) {
                  throw { name: 'Invalid Email' };
            }
           
            if (!req.body.password) {
                throw { name: 'Password is Required' };
            }
            const loginUser:any = {
                username: req.body.username,
                email: req.body.email
            };
            for (const key in loginUser) {
                if (!loginUser[key]) {
                    delete loginUser[key];
                }
            }
            const foundUser = await User.findOne(loginUser);
            // When user not found
            if (!foundUser) {
                throw { name: 'Email not Registered' };
            }
            const isPasswordValid = await bcrypt.compare(
                req.body.password,
                foundUser.password
            );
            // When User password is wrong
            if (!isPasswordValid) {
                throw { name: 'Invalid Password' };
            }
            const secretKey: string = (process.env.SECRET_KEY as string)
         
            let token:any = jwt.sign({ id: foundUser.id }, secretKey);
            res.status(200).json({
                success: true,
                message: 'Login Success',
                data: {
                    userID: foundUser._id,
                    userName: foundUser.name,
                    bearerToken: `Bearer ${token}`,
                    expiresIn: 3600,
                },
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }
   
}

export default Auth