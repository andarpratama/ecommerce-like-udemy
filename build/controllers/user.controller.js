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
const Users_1 = require("../models/Users");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validator_1 = __importDefault(require("validator"));
class UserController {
    static home(req, res) {
        res.status(200).json({ mgs: 'user/home' });
    }
    static info(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundUser = yield Users_1.User.findOne({
                    _id: req.params.userID
                });
                res.status(200).json({
                    success: true,
                    message: 'User Found',
                    data: foundUser,
                    status: 'OK',
                    statusCode: 200
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getUserDetail(req, res) {
        const idUser = req.userId;
        Users_1.User.findById(idUser)
            .then((result) => {
            res.status(201).json({ msg: 'Detail user..', data: result });
        })
            .catch((err) => {
            res.status(500).json({ msg: 'Failed show detail user..', error: err });
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.name ||
                    !req.body.email ||
                    !req.body.password ||
                    !req.body.image ||
                    !req.body.address ||
                    !req.body.city ||
                    !req.body.telp) {
                    throw { name: 'All Input Required' };
                }
                if (!validator_1.default.isEmail(req.body.email)) {
                    throw { name: 'Invalid Email' };
                }
                const editUser = {
                    name: req.body.name,
                    email: req.body.email,
                    password: yield bcryptjs_1.default.hash(req.body.password, 8),
                    image: req.body.image,
                    address: req.body.address,
                    city: req.body.city,
                    telp: req.body.telp
                };
                for (const key in editUser) {
                    if (!editUser[key]) {
                        delete editUser[key];
                    }
                }
                yield Users_1.User.findOneAndUpdate({ _id: req.params.userID }, editUser, {
                    new: true
                });
                res.status(200).json({
                    success: true,
                    message: 'Successfully edit user info',
                    status: 'OK',
                    statusCode: 200
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = UserController;
