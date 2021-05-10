import {Application, NextFunction, Request, Response} from 'express'
import express from 'express'
import logging from './config/logging';
import config from './config/config';
import ConnectMongoDB from './config/db'
import Routes from './routers/index'
import cors from "cors";

class App {
   public app: Application
   constructor() { 
      this.app = express()
      this.plugin()
      this.route()
   }

   protected plugin(): void{
      this.app.use(cors())
      this.app.use(express.json())
      this.app.use(express.urlencoded({ extended: true }))
      ConnectMongoDB()

      this.app.use((req : Request, res: Response, next: NextFunction) => {
         res.setHeader("Access-Control-Allow-Origin", "*");
         res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
         );
         res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, PUT, DELETE, OPTIONS"
         );
         next();
      });
   }

   protected route(): void{
      this.app.use(Routes)
   }
}

export default App