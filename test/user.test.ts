import request from "supertest";
import { IUser } from "../src/interface/IUser";
import { User } from "../src/models/Users";
import { loginUser, registerUser } from "./helper/authentication.helper";
import { infoUser, editUser } from "./helper/user.helper";
import mongoose from 'mongoose'
import App from "../src/server";
const app = new App().app

describe('GET /users/:userID/info - User Info Endpoint', () => {
    let userLoginResult: request.Response;
    beforeEach(async () => {
        const userRegister = await registerUser({
            name: 'Test',
            email: 'test@gmail.com',
            password: 'test12'
        } as IUser);
        expect(userRegister.status).toEqual(201);
        const userLogin = await loginUser({
            email: 'test@gmail.com',
            password: 'test12'
        } as IUser);
        expect(userLogin.status).toEqual(200);
        userLoginResult = userLogin;
    });
    afterEach(async () => {
        await User.deleteMany();
    });

    it('Should be able to see user info', async () => {
        const userInfo = await request(app)
        .get(`/user/info/${userLoginResult.body.data.userID}`)
        .set('Authorization', 'bearer ' + userLoginResult.body.data.bearerToken);
      // expect(userInfo.status).toEqual(200);
      // console.log(userLoginResult.body.data.bearerToken)
         console.log(userInfo.status)
         console.log(userInfo.body)
         expect(200);
        
    });
   
});