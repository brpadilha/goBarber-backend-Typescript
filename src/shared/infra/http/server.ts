import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';

import cors from 'cors';

import 'express-async-errors';
import routes from './routes'; // importando as rotas
import uploadConfig from '../../../config/upload';

import '../typeorm/index';
import AppError from '../../errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory)); // acessar ao file com um endereço estático
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server is running on port 3333!');
});
