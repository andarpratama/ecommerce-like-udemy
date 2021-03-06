"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler {
    static handleErrors(err, req, res, next) {
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
            // User controller
            case 'All Input Required':
                statusCode = 422;
                message =
                    'All Input Required: Please input all profile data';
                status = 'Unprocessable Entity';
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
exports.default = ErrorHandler;
