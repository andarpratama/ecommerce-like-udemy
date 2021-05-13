"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const logging_1 = __importDefault(require("./config/logging"));
const config_1 = __importDefault(require("./config/config"));
const app = new server_1.default().app;
const NAMESPACE = 'SERVER';
app.listen(process.env.PORT, () => logging_1.default.info(NAMESPACE, `Server is running http://${config_1.default.server.hostname}:${process.env.PORT}`));
