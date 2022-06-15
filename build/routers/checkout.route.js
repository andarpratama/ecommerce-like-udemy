"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkout_controller_1 = __importDefault(require("../controllers/checkout.controller"));
class CheckoutRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.home();
        this.add();
    }
    home() {
        this.router.get('/', checkout_controller_1.default.home);
    }
    add() {
        this.router.post('/add/:courseId', checkout_controller_1.default.add);
    }
}
exports.default = new CheckoutRoute().router;
