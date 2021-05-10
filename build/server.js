"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const index_1 = __importDefault(require("./routers/index"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
class App {
    constructor() {
        this.app = express_1.default();
        this.route();
        this.plugin();
        dotenv_1.default.config();
    }
    plugin() {
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        db_1.default();
        // this.app.use((req : Request, res: Response, next: NextFunction) => {
        //    res.setHeader("Access-Control-Allow-Origin", "*");
        //    res.setHeader(
        //       "Access-Control-Allow-Headers",
        //       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        //    );
        //    res.setHeader(
        //       "Access-Control-Allow-Methods",
        //       "GET, POST, PATCH, PUT, DELETE, OPTIONS"
        //    );
        //    next();
        // });
    }
    route() {
        this.app.use(index_1.default);
    }
}
exports.default = App;
