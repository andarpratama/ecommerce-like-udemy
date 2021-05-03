jest.useFakeTimers()
import request from "supertest";
import App from "../../src/server";
import { IUser } from "../../src/interface/IUser";
const app = new App().app
import mongoose from "mongoose";

// afterAll(() => { 
//   mongoose.connection.close()
// })

const registerUser = async (user: IUser) => {
   const userRegister = await request(app).post('/auth/register').send(user)
   return userRegister
}

const loginUser = async (user: IUser) => {
   const userLogin = await request(app).post('/auth/login').send(user)
   return userLogin
}

export {registerUser, loginUser}