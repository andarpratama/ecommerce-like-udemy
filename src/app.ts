import express, { Application} from 'express'
import logging from './config/logging';
import config from './config/config';
import ConnectMongoDB from './config/db'
import Routes from './routers/index'

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


const app = new App().app
const NAMESPACE:string = 'SERVER'
app.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running http://${config.server.hostname}:${config.server.port}`))
