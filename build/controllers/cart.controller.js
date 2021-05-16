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
const logging_1 = __importDefault(require("../config/logging"));
const Users_1 = require("../models/Users");
class CartController {
    static home(req, res, err) {
        res.status(200).json({ message: 'Cart / Home' });
    }
    static add(req, res, err) {
        return __awaiter(this, void 0, void 0, function* () {
            const { courseId } = req.params;
            const { userId } = req.body;
            try {
                const pushCourseId = yield Users_1.User.findByIdAndUpdate(userId, { $push: { 'cartId': courseId } }, { new: true });
                // const pushCourseId = await User.findById(idUser)
                logging_1.default.info('ADD COURSE IN CART', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
                res.status(201).json({ msg: 'Pull new cart is success..', pushCourseId: pushCourseId });
            }
            catch (err) {
                logging_1.default.warn('ADD COURSE IN CART', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
                res.status(500).json({ msg: 'Pull new cart is failed..', error: err });
            }
        });
    }
    static delete(req, res, err) {
        return __awaiter(this, void 0, void 0, function* () {
            const { courseId } = req.params;
            const { userId } = req.body;
            try {
                const pullCourseId = yield Users_1.User.findByIdAndUpdate(userId, { $pull: { 'cartId': courseId } }, { new: true });
                logging_1.default.info('DELETE COURSE IN CART', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
                res.status(201).json({ msg: 'Pull new cart is success..', });
            }
            catch (err) {
                logging_1.default.warn('DELETE COURSE IN CART', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
                res.status(500).json({ msg: 'Pull new cart is failed..', error: err });
            }
        });
    }
}
exports.default = CartController;
