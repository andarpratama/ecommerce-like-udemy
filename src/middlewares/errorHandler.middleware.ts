import { Response, NextFunction, ErrorRequestHandler } from 'express';
import { IUserAuthorize } from '../interface/IUser.authorize';

class ErrorHandler {
    static handleErrors(
        err: ErrorRequestHandler,
        req: IUserAuthorize,
        res: Response,
        next: NextFunction
    ) {
        let statusCode;
        let message;
        let status;

       switch (err.name) {
            // -- Register
            case 'Username or Email Required':
                statusCode = 422;
                message =
                    'Username or Email Required: Your username or email is required to perform this action';
                status = 'Unprocessable Entity';
                break;
            case 'Name and Email Required':
                statusCode = 422;
                message =
                    'Name and Email Required: Your name and email is required to perform this action';
                status = 'Unprocessable Entity';
             break;
          
            // -- Login
            case 'Email is Required':
                statusCode = 422;
                message =
                    'Email is Required: Your email is required to perform this action';
                status = 'Unprocessable Entity';
             break;
            case 'Password is Required':
                statusCode = 422;
                message =
                    'Password is Required: Your password is required to perform this action';
                status = 'Unprocessable Entity';
             break;
            case 'Invalid Email':
                statusCode = 401;
                message =
                    'Invalid Email: Please input valid Email';
                status = 'Unauthorized';
                break;
            case 'Email not Registered':
                statusCode = 401;
                message =
                    'Invalid Email: Your email is wrong or not registerd';
                status = 'Unauthorized';
                break;
            case 'Invalid Password':
                statusCode = 401;
                message =
                    'Invalid Password: Your password is wrong';
                status = 'Unauthorized';
                break;
            case 'Failed Register':
                statusCode = 500;
                message =
                    'Failed Register: Internal server error';
                status = 'Internal server error';
             break;
           
            // -- Authentication
            case 'Invalid Token':
                statusCode = 500;
                message =
                    'Invalid Access Token: Please input correctly token';
                status = 'Internal server error';
                break;
            case 'Missing Access Token':
                statusCode = 401;
                message =
                    'Missing Access Token: Please input your access token';
                status = 'Unauthorized';
                break;
            case 'Access Token No Longer Registered':
                statusCode = 401;
                message =
                    'Access Token No Longer Registered: The access token is no longer registered, please register and re-login to get a new access token';
                status = 'Unauthorized';
                break;
            case 'Forbidden Access':
                statusCode = 403;
                message =
                    'Forbidden Access: Sorry, access is restricted, make sure you use your own access token';
                status = 'Forbidden';
                break;
            case 'Insufficient Cost':
                statusCode = 409;
                message =
                    'Insufficient Cost: Your golds and foods are not enough to build the building';
                status = 'Conflict';
                break;
            case 'Reached The Maximum Limit':
                statusCode = 409;
                message =
                    'Reached The Maximum Limit: The number of these buildings has reached its maximum limit';
                status = 'Conflict';
                break;
            case 'Soldiers Required':
                statusCode = 422;
                message =
                    'Soldiers Required: The number of your soldiers is required to perform this action';
                status = 'Unprocessable Entity';
                break;
            case `Can't Attack Yourself`:
                statusCode = 409;
                message = `Can't Attack Yourself: you can't attack yourself`;
                status = 'Conflict';
                break;
            case `Can't Attack This User`:
                statusCode = 409;
                message = `Can't Attack This User: You cannot attack this user because this user's army is less than 50 or your army is less than 1`;
                status = 'Conflict';
                break;
            case 'JsonWebTokenError':
                statusCode = 401;
                message =
                    'JsonWebTokenError: Invalid access token, please check the validity of your access token';
                status = 'Unauthorized';
                break;
            case 'MongoError':
                statusCode = 422;
                message = `MongoError: Sorry this data has been used by another user, please enter a unique data`;
                status = 'Unprocessable Entity';
                break;
            case 'ValidationError':
                statusCode = 422;
                message =
                    'ValidationError: Make sure you have filled all the required fields with the valid data';
                status = 'Unprocessable Entity';
                break;
            default:
                statusCode = 500;
                message = `Internal Server Error: Sorry, our server is in trouble`;
                status = 'Internal Server Error';
                break;
        }

        res.status(statusCode).json({
            success: false,
            message: message,
            error: err,
            status: status,
            statusCode: statusCode
        });
    }
}

export default ErrorHandler;
