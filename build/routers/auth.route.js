"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const errorHandler_middleware_1 = __importDefault(require("../middlewares/errorHandler.middleware"));
class AuthRoute {
    constructor() {
        this.router = express_1.Router();
        this.home();
        this.register();
        this.login();
        this.errorHandler;
    }
    home() {
        this.router.get('/', auth_controller_1.default.home);
    }
    register() {
        this.router.post('/register', auth_controller_1.default.register);
    }
    login() {
        this.router.post('/login', auth_controller_1.default.login);
    }
    errorHandler() {
        this.router.use(errorHandler_middleware_1.default.handleErrors);
    }
}
exports.default = new AuthRoute().router;
