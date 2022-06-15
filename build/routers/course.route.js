"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = __importDefault(require("../controllers/course.controller"));
class CourseRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.home();
        this.create();
        this.getAll();
        this.getOne();
        this.filterDevcategory();
        this.filterCategory();
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
    filterDevcategory() {
        this.router.get('/filter/devcategory/:keyword', course_controller_1.default.filterDevcategory);
    }
    filterCategory() {
        this.router.get('/filter/category/:keyword', course_controller_1.default.filterCategory);
    }
    create() {
        this.router.post('/create', course_controller_1.default.create);
    }
}
exports.default = new CourseRoute().router;
