"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = __importDefault(require("../controllers/cart.controller"));
const authJwt_1 = __importDefault(require("../middlewares/authJwt"));
class CartRoute {
    constructor() {
        this.router = express_1.Router();
        this.home();
        this.addNoAuth();
        this.deleteNoAuth();
        this.authJWT();
        this.add();
        this.delete();
    }
    authJWT() {
        this.router.use(authJwt_1.default.authentication);
    }
    home() {
        this.router.get('/', cart_controller_1.default.home);
    }
    add() {
        this.router.post('/add/:courseId', cart_controller_1.default.add);
    }
    addNoAuth() {
        this.router.post('/add/noauth/:courseId', cart_controller_1.default.add);
    }
    delete() {
        this.router.post('/delete/:courseId', cart_controller_1.default.delete);
    }
    deleteNoAuth() {
        this.router.post('/delete/noauth/:courseId', cart_controller_1.default.delete);
    }
}
exports.default = new CartRoute().router;
