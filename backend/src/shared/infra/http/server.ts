import 'reflect-metadata';
import express, { Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';

import uploadConfig from '@config/upload';
import routes from './routes';
import AppError from '@shared/errors/AppError';


import '@shared/infra/typeorm';

const app = express();

app.use(bodyParser.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if(err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
});

app.listen(3333, () => {
  console.log('🎈 Server started on port 3333!');
});
