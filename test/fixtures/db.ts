import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {User} from "../../src/models/Users";

const userOneId = new mongoose.Types.ObjectId();

const secretKey: string = (process.env.SECRET_KEY as string)
const userOne = {
  _id: userOneId,
  name: "Mike",
  email: "mike@example.com",
  password: "MikePass432!",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, secretKey),
    },
  ],
};

const setupDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save()
};


export { userOneId, userOne, setupDatabase }
