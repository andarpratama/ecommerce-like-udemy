import express, { Response,Request, ErrorRequestHandler, NextFunction } from "express"

const errorHandler = (err:ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
   let code
   let name = err.name
   let message

   switch (name) {
      case 'Missing_Token':
         code =  401
         message = 'Nothing access token...'
         break;
      
      case 'Invalid_Token':
         code = 500
         message = 'Invalid token..'
         break;
      
      case 'Failed_register':
         code = 500
         message = 'Failed to register..'
         break;
      
      case 'Failed_login':
         code = 500
         message = 'Failed to login..'
         break;
      
      case 'Login_required_input':
         code = 500
         message = 'Please input name, email and password..'
         break;
      
      case 'Failed_created':
         code = 500
         message = 'Failed create..'
         break;
      
      case 'Failed_updated':
         code = 500
         message = 'Failed update..'
         break;
      
      case 'Failed_deleted':
         code = 500
         message = 'Failed delete..'
         break;
      
      case 'Failed_get_all':
         code = 500
         message = 'Failed get all..'
         break;
      
      case 'Failed_get_detail':
         code = 500
         message = 'Failed get detail..'
         break;
      
      case 'Failed_attack':
         code = 500
         message = 'Failed attack another user..'
         break;
      
      case 'Failed_attack_soldier_not_enough':
         code = 500
         message = 'Soldier is not enough..'
         break;
      
      case 'Enemy_soldier_not_enough':
         code = 500
         message = 'Cant attack, enemy soldier less than 50..'
         break;
      
      case 'Your_soldiers_greater':
         code = 500
         message = 'Your soldiers greater than enemy soldier..'
         break;
   
      default:
         code = 500
         message = 'Internal server error'
         break;
   }

   res.status(code).json({success: false,  message})
}

export default errorHandler