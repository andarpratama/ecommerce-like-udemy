import { NextFunction, Response, Request, ErrorRequestHandler } from 'express';
import  dotenv from 'dotenv'
import * as jwt from 'jsonwebtoken';

class authJwt {
   static authentication(req: Request, res: Response, next: NextFunction) {
      const accessToken: any = req.headers.accesstoken
      
      if (!accessToken) {
         throw { name: 'Missing Access Token' };
      }
      
      const secretKey: string = (process.env.SECRET_KEY as string)
      jwt.verify(accessToken, secretKey, (err: any, decoded:any) => {
         if (err) {
            throw ({name: 'Invalid Token'})
         }
         // id dari token dan dimasukan kedalam req
         (<any>req).userId = decoded.id
         next()
      })
   }
}

export default authJwt