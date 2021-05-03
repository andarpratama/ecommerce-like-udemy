import mongoose from 'mongoose'
import logging from './logging'


class mongooDB {
   public connectDB(): void {
      const pathURL = process.env.DB_URL!
      const connectOption = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}
      mongoose.connect(pathURL, connectOption)

      const db = mongoose.connection
      db.on('error', ()=> logging.error('DATABASE', 'MESSAGE: Connection error..'))
      db.once('open', () => {
         logging.info('DATABASE', 'MESSAGE: Database connected..')
      })
   }
}

export default new mongooDB().connectDB