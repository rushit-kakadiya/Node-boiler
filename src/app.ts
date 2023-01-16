import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { createStream } from 'rotating-file-stream';

import * as middlewares from './middlewares/errors.middleware';
import v1 from './api/v1';
import ResponseWithMessage from './types/ResponseWithMessage';
import Environments from './types/Environments';
import mongo from './helpers/db.helper';
import compression from 'compression';
import rateLimiter from './middlewares/ratelimitter.middleware';

const app = express();
dotenv.config();

// create a rotating write stream if app is running in production environment.
if (process.env.NODE_ENV === Environments.PRODUCTION) {
  let accessLogStream = createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'logs'),
  });
  app.use(morgan('common', { stream: accessLogStream }));
}
app.use(morgan('dev'));

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(
  express.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true,
  }),
);
app.use(express.json());

//health check route
app.get<{}, ResponseWithMessage>('/', (req, res) => {
  res.json({ message: 'Backend is up.' });
});

//API routes import
app.use('/api/v1', v1);

//error handlers middlewares
app.use(rateLimiter);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
mongo();

export default app;
