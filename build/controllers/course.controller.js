"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Courses_1 = require("../models/Courses");
const logging_1 = __importDefault(require("../config/logging"));
class CourseController {
    static home(req, res, err) {
        res.status(200).json({ message: 'Course / Home' });
    }
    static getAll(req, res, err) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield Courses_1.Courses.find();
                res.status(200).json({ message: 'Success get all course..', totalData: courses.length, data: courses });
            }
            catch (err) {
                res.status(200).json({ message: 'Failed get all course..', data: err });
            }
        });
    }
    static getOne(req, res, err) {
        return __awaiter(this, void 0, void 0, function* () {
            const idCourse = req.params.idcourse;
            try {
                const oneCourse = yield Courses_1.Courses.findById(idCourse);
                res.status(200).json({ message: 'Success get this one course..', data: oneCourse });
            }
            catch (err) {
                res.status(200).json({ message: 'Failed get this one course..', data: err });
            }
        });
    }
    static filter(req, res, err) {
        return __awaiter(this, void 0, void 0, function* () {
            const keyword = req.params.keyword;
            try {
                let foundCourse = yield Courses_1.Courses.find();
                let filterCourse = foundCourse.filter((course) => {
                    return course.devCategory === keyword;
                });
                res.status(200).json({ message: 'Success get this one course..', data: filterCourse });
            }
            catch (err) {
                res.status(200).json({ message: 'Failed get this one course..', data: err });
            }
        });
    }
    static create(req, res, err) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, image, instructor, topic, level, category, devCategory } = req.body;
            const price = parseInt(req.body.price);
            const hours = parseInt(req.body.hours);
            const students = parseInt(req.body.students);
            const idUser = req.userId;
            try {
                const createCourse = yield Courses_1.Courses.create({
                    title: title,
                    image: image,
                    instructor: instructor,
                    topic: topic,
                    level: level,
                    category: category,
                    price: price,
                    hours: hours,
                    students: students,
                    devCategory: devCategory
                });
                logging_1.default.info('CREATE COURSE', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
                res.status(201).json({ msg: 'Creating new courses is success..', data: createCourse });
            }
            catch (err) {
                logging_1.default.warn('CREATE COURSE', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
                // res.status(500).json({msg: 'Creating new courses is failed..', error: err})  
                console.log(err);
                throw ({ name: 'Failed_created' });
            }
        });
    }
}
exports.default = CourseController;
