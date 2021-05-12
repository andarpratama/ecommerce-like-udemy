import { IUser } from "../src/interface/IUser";
import { User } from "../src/models/Users";
import { loginUser, registerUser } from "./helper/authentication.helper";
import mongoose from 'mongoose'
import App from "../src/server";
const app = new App().app

describe('POST /auth/register - User Registertarion Endpoint', () => {
   beforeEach(async () => {
      await User.deleteMany()
   })
   afterEach(async () => {
        await User.deleteMany();
    });
   it('Should be able to register', async () => {
      const userRegister = await registerUser({
         name: 'Test',
         email: 'test@gmail.com',
         password: 'test12'
      } as IUser)
      expect(userRegister.status).toEqual(201)
   })

   it(`Should can handle the error, if input invalid email for register`, async () => {
      const userRegister = await registerUser({
            name: 'Test',
            email: 'test',
            password: 'test12'
        } as IUser);
        expect(userRegister.status).toEqual(401);
        expect(userRegister.body).toEqual({
            success: false,
            message:
                'Invalid Email: Please input valid Email',
            error: { name: 'Invalid Email' },
            status: 'Unauthorized',
            statusCode: 401
        });
   });
})

describe('POST /users/login - User Login Endpoint', () => {
    beforeEach(async () => {
        const userRegister = await registerUser({
            name: 'Test',
            email: 'test@gmail.com',
            password: 'test12'
         } as IUser)
         expect(userRegister.status).toEqual(201)
    });
   
    afterEach(async () => {
        await User.deleteMany();
    });
   
    it('Should be able to login with username and password', async () => {
        const userLogin = await loginUser({
            email: 'test@gmail.com',
            password: 'test12'
        } as IUser);
        expect(userLogin.status).toEqual(200);
        expect(userLogin.body).toEqual({
            success: true,
            message: 'Login Success',
            data: {
                userID: userLogin.body.data.userID,
                userName: userLogin.body.data.userName,
                expiresIn: 3600,
                bearerToken: userLogin.body.data.bearerToken
            },
            status: 'OK',
            statusCode: 200
        });
    });
   
   it(`Should can handle the error, if doesn't input their email`, async () => {
        const userLogin = await loginUser({
            password: 'test12'
        } as IUser);
        expect(userLogin.status).toEqual(422);
        expect(userLogin.body).toEqual({
            success: false,
            message:
                'Email is Required: Your email is required to perform this action',
            error: { name: 'Email is Required' },
            status: 'Unprocessable Entity',
            statusCode: 422
        });
   });
   
   it(`Should can handle the error, if doesn't input their password`, async () => {
        const userLogin = await loginUser({
            email: 'test@gmail.com',
        } as IUser);
        expect(userLogin.status).toEqual(422);
        expect(userLogin.body).toEqual({
            success: false,
            message:
                'Password is Required: Your password is required to perform this action',
            error: { name: 'Password is Required' },
            status: 'Unprocessable Entity',
            statusCode: 422
        });
    });
});