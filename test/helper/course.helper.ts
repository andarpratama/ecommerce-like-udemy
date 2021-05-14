import request from "supertest";
import App from "../../src/server";
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

const getFilterCourseFrontend = async (keyword:string) => {
    const foundCourse = await request(app)
        .get(`/course/filter/devcategory/${keyword}`)
    return foundCourse;
};

const getFilterCategory = async (keyword:string) => {
    const foundCourse = await request(app)
        .get(`/course/filter/category/${keyword}`)
    return foundCourse;
};

const getOne = async (userID:string) => {
    const foundCourse = await request(app)
        .get(`/course/getone/${userID}`)
    return foundCourse;
};

const update = async (userID:string) => {
    const foundCourse = await request(app)
        .put(`/course/${userID}`)
    return foundCourse;
};


export { getAll , getOne, getFilterCourseFrontend, getFilterCategory, createCourse, update };