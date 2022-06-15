"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_route_1 = __importDefault(require("./course.route"));
const user_route_1 = __importDefault(require("./user.route"));
const cart_route_1 = __importDefault(require("./cart.route"));
const checkout_route_1 = __importDefault(require("./checkout.route"));
const errorHandler_middleware_1 = __importDefault(require("../middlewares/errorHandler.middleware"));
const auth_route_1 = __importDefault(require("./auth.route"));
class Routes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.home();
        this.auth();
        this.course();
        this.user();
        this.cart();
        this.checkout();
        this.errorHandler();
    }
    home() {
        this.router.get('/', (req, res) => {
            res.status(200).json({
                message: 'Welcome to the Ecommerce Like Udemy API',
                title: 'Ecommerce Like Udemy',
                author: 'Andar Pratama',
                detail_author: 'https://ecommerce-like-udemy.herokuapp.com/author',
                version: 2.0,
                repo: 'https://github.com/andarpratama/ecommerce-like-udemy',
                slide: 'https://bit.ly/3kuAjqY',
            });
        });
        this.router.get('/author', (req, res) => {
            res.status(200).json({
                name: 'Andar Pratama',
                address: 'Tangerang',
                phone: '081283699257',
                education: 'Bachelor Degree in Informatics Enginering',
                instagram: '@andar.pratama_',
                github: 'https://github.com/andarpratama',
                linkedin: 'https://www.linkedin.com/in/andarpratama/',
            });
        });
    }
    auth() {
        this.router.use('/auth', auth_route_1.default);
    }
    course() {
        this.router.use('/course', course_route_1.default);
    }
    user() {
        this.router.use('/user', user_route_1.default);
    }
    cart() {
        this.router.use('/cart', cart_route_1.default);
    }
    checkout() {
        this.router.use('/checkout', checkout_route_1.default);
    }
    errorHandler() {
        this.router.use(errorHandler_middleware_1.default.handleErrors);
    }
}
exports.default = new Routes().router;
