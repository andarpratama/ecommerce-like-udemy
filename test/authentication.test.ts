jest.useFakeTimers()
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
                bearerToken: userLogin.body.data.bearerToken
            },
            status: 'OK',
            statusCode: 200
        });
    });
});