import { Request, Response, ErrorRequestHandler } from "express";

class UserController {
   static home(req:Request, res:Response) {
      res.status(200).json({mgs: 'user/home'})
   }
}

export default UserController