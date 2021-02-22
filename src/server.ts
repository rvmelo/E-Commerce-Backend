import 'reflect-metadata';
import './database';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import cors from 'cors';

import routes from './routes';
import AppError from './errors/appError';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'Error', message: err.message });
  }

  return res
    .status(500)
    .json({ status: 'Error', message: 'Internal server error' });
});

app.listen(3333, () => console.log('server started on port 3333'));
