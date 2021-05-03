import { IUser } from "../src/interface/IUser";
import { User } from "../src/models/Users";
import { loginUser, registerUser } from "./helper/authentication.helper";
jest.useFakeTimers()
import request from "supertest";
import mongoose from "mongoose";
import App from "../src/server";
const app = new App().app

// describe('POST /auth/register - User Registertarion Endpoint', () => {
//    // afterEach(async () => {
//    //    await User.deleteMany()
//    // })

//    it('Should be able to register', async () => {
//       const userRegister = await registerUser({
//          name: 'Test',
//          email: 'test@gmail.com',
//          password: 'test12'
//       } as IUser)
//       // console.log(userRegister)
//       expect(userRegister.status).toEqual(201)
//    })
// })

describe('GET /user', function() {
  it('responds with json', function() {
    request(app)
      .post('/auth/register')
      .send({
         name: 'Test',
         email: 'test@gmail.com',
         password: 'test12'
      })
      .expect(201);
  });
});