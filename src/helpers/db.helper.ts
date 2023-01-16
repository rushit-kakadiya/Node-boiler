import mongoose from 'mongoose';
import { MONGODB_URI } from '../util/Const';
import logger from './logger.helper';

const mongo = () => {
  const connection = mongoose.connection;
  const mongoDbUri = process.env.MONGODB_URI || MONGODB_URI;
  connection.on('connected', () => {
    logger.info('Mongo Connection Established');
  });
  connection.on('reconnected', () => {
    logger.info('Mongo Connection Reestablished');
  });
  connection.on('disconnected', () => {
    logger.info('Mongo Connection Disconnected');
    logger.info('Trying to reconnect to Mongo ...');
    setTimeout(async () => {
      await mongoose.connect(mongoDbUri);
    }, 3000);
  });
  connection.on('close', () => {
    logger.info('Mongo Connection Closed');
  });
  connection.on('error', (error: Error) => {
    logger.info('Mongo Connection ERROR: ' + error);
  });

  const run = async () => {
    await mongoose.connect(mongoDbUri);
  };
  run().catch((error) => console.error(error));
};

export default mongo;
