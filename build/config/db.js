"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logging_1 = __importDefault(require("./logging"));
const dotenv_1 = __importDefault(require("dotenv"));
class mongooDB {
    constructor() {
        dotenv_1.default.config();
    }
    connectDB() {
        const pathURL = 'mongodb+srv://andarpratama:0ne41sGvLaRjTrCA@node-game-app.scrnm.mongodb.net/ecommerce-like-udemy?retryWrites=true&w=majority';
        const connectOption = {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        };
        mongoose_1.default.connect(pathURL, connectOption);
        const db = mongoose_1.default.connection;
        db.on('error', () => logging_1.default.error('DATABASE', 'MESSAGE: Connection error..'));
        db.once('open', () => {
            logging_1.default.info('DATABASE', 'MESSAGE: Database connected..');
        });
    }
}
exports.default = new mongooDB().connectDB;
