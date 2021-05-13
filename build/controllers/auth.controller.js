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
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validator_1 = __importDefault(require("validator"));
class Auth {
    constructor() {
        dotenv_1.default.config();
    }
    static home(req, res, err) {
        res.status(200).json({ message: 'Auth / Home' });
    }
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.name || !req.body.email) {
                    throw { name: 'Name and Email Required' };
                }
                if (!validator_1.default.isEmail(req.body.email)) {
                    throw { name: 'Invalid Email' };
                }
                if (!req.body.password) {
                    throw { name: 'Password Required' };
                }
                const newUser = new Users_1.User({
                    name: req.body.name,
                    email: req.body.email,
                    password: yield bcryptjs_1.default.hash(req.body.password, 8)
                });
                yield newUser.save();
                res.status(201).json({
                    success: true,
                    message: 'Success Registration',
                    status: 'Created',
                    statusCode: 201
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.email) {
                    throw { name: 'Email is Required' };
                }
                if (!validator_1.default.isEmail(req.body.email)) {
                    throw { name: 'Invalid Email' };
                }
                if (!req.body.password) {
                    throw { name: 'Password is Required' };
                }
                const loginUser = {
                    username: req.body.username,
                    email: req.body.email
                };
                for (const key in loginUser) {
                    if (!loginUser[key]) {
                        delete loginUser[key];
                    }
                }
                const foundUser = yield Users_1.User.findOne(loginUser);
                // When user not found
                if (!foundUser) {
                    throw { name: 'Invalid Email' };
                }
                const isPasswordValid = yield bcryptjs_1.default.compare(req.body.password, foundUser.password);
                // When User password is wrong
                if (!isPasswordValid) {
                    throw { name: 'Invalid Password' };
                }
                const secretKey = process.env.SECRET_KEY;
                let token = jsonwebtoken_1.default.sign({ id: foundUser.id }, secretKey);
                res.status(200).json({
                    success: true,
                    message: 'Login Success',
                    data: {
                        userID: foundUser._id,
                        userName: foundUser.name,
                        bearerToken: `Bearer ${token}`,
                        expiresIn: 3600,
                    },
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
exports.default = Auth;
