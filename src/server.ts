import {Application, NextFunction, Request, Response} from 'express'
import express from 'express'
import ConnectMongoDB from './config/db'
import Routes from './routers/index'
import cors from "cors";
import dotenv from 'dotenv'

class App {
   public app: Application
   constructor() { 
      dotenv.config()
      this.app = express()
      this.route()
      this.plugin()
   }

   protected plugin(): void{
      ConnectMongoDB()
      this.app.use(cors())
      this.app.use(express.json())
      this.app.use(express.urlencoded({ extended: true }))

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