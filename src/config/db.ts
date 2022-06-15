import mongoose from 'mongoose';
import logging from './logging';
import dotenv from 'dotenv';

class mongooDB {
  constructor() {
    dotenv.config();
  }

  public connectDB(): void {
    const pathURL: string =
      'mongodb+srv://andarpratama:0ne41sGvLaRjTrCA@node-game-app.scrnm.mongodb.net/ecommerce-like-udemy?retryWrites=true&w=majority';
    const connectOption = {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };
    mongoose.connect(pathURL, connectOption);

    const db = mongoose.connection;
    db.on('error', () =>
      logging.error('DATABASE', 'MESSAGE: Connection error..')
    );
    db.once('open', () => {
      logging.info('DATABASE', 'MESSAGE: Database connected..');
    });
  }
}

export default new mongooDB().connectDB;
