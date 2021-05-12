import request from "supertest";
import App from "../../src/server";
import { IUser } from "../../src/interface/IUser";
import { ICourse } from "../../src/interface/ICourse";
const app = new App().app

const createCourse = async (data: ICourse) => {
    const foundCourse = await request(app)
        .post(`/course/create`).send(data)
    return foundCourse;
};

const getAll = async () => {
    const foundCourse = await request(app)
        .get(`/course/getall`)
    return foundCourse;
};

const getOne = async (userID:string) => {
    const foundCourse = await request(app)
        .get(`/course/getone/${userID}`)
    return foundCourse;
};


export { getAll , getOne, createCourse };