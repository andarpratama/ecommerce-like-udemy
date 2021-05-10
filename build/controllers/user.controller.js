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
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = require("../models/Users");
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
        console.log(idUser);
        Users_1.User.findById(idUser)
            .then((result) => {
            res.status(201).json({ msg: 'Detail user..', data: result });
        })
            .catch((err) => {
            res.status(500).json({ msg: 'Failed show detail user..', error: err });
        });
    }
    static updateUser(req, res) {
        const idUser = req.userId;
        const { name, email, password } = req.body;
        const updateData = { name, email, password };
        for (const item in updateData) {
            //   if (updateData[item] === updateData['password']) {
            //      updateData[item] = bcrypt.hashSync(updateData[item], 8);
            //   }
            if (!updateData[item]) {
                delete updateData[item];
            }
        }
        Users_1.User.findByIdAndUpdate(idUser, updateData, { new: true })
            .then((result) => {
            res.status(200).json({ msg: 'Success update the user', data: result });
        })
            .catch((err) => {
            res.status(500).json({ msg: 'Failed update the user' });
        });
    }
}
exports.default = UserController;
