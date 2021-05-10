"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = __importDefault(require("../controllers/course.controller"));
const authJwt_1 = __importDefault(require("../middlewares/authJwt"));
class CourseRoute {
    constructor() {
        this.router = express_1.Router();
        this.home();
        this.create();
        this.getAll();
        this.getOne();
        this.filter();
        this.auth();
    }
    auth() {
        this.router.use(authJwt_1.default.authentication);
    }
    home() {
        this.router.get('/', course_controller_1.default.home);
    }
    getAll() {
        this.router.get('/getall', course_controller_1.default.getAll);
    }
    getOne() {
        this.router.get('/getone/:idcourse', course_controller_1.default.getOne);
    }
    filter() {
        this.router.get('/filter/devcategory/:keyword', course_controller_1.default.filter);
    }
    create() {
        this.router.post('/create', course_controller_1.default.create);
    }
}
exports.default = new CourseRoute().router;
