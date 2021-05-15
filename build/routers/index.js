"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_route_1 = __importDefault(require("./course.route"));
const user_route_1 = __importDefault(require("./user.route"));
const cart_route_1 = __importDefault(require("./cart.route"));
const errorHandler_middleware_1 = __importDefault(require("../middlewares/errorHandler.middleware"));
const auth_route_1 = __importDefault(require("./auth.route"));
class Routes {
    constructor() {
        this.router = express_1.Router();
        this.home();
        // this.auth()
        this.course();
        this.user();
        this.cart();
        this.errorHandler();
    }
    home() {
        this.router.get('/', (req, res) => {
            const NAMESPACE = 'HOME';
            // logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
            res.status(200).json({ msg: 'Welcome.. login to get started' });
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
    errorHandler() {
        this.router.use(errorHandler_middleware_1.default.handleErrors);
    }
}
exports.default = new Routes().router;
