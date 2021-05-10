"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
class authJwt {
    static authentication(req, res, next) {
        const accessToken = req.headers.accesstoken;
        if (!accessToken) {
            throw { name: 'Missing Access Token' };
        }
        const secretKey = process.env.SECRET_KEY;
        jwt.verify(accessToken, secretKey, (err, decoded) => {
            if (err) {
                throw ({ name: 'Invalid Token' });
            }
            // id dari token dan dimasukan kedalam req
            req.userId = decoded.id;
            next();
        });
    }
}
exports.default = authJwt;
