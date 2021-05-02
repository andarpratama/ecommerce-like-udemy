import express, { Application} from 'express'
import logging from '../src/config/logging';
import config from '../src/config/config';
import ConnectMongoDB from '../src/config/db'
import Routes from '../src/routers/index'

class App {
   public app: Application
   constructor() { 
      this.app = express()
      this.plugin()
      this.route()
   }

   protected plugin(): void{
      this.app.use(express.urlencoded({ extended: true }))
      ConnectMongoDB()
   }

   protected route(): void{
      this.app.use(Routes)
   }
}

export default App