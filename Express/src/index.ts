import 'reflect-metadata';
import * as express from 'express';
import * as BodyParser from 'body-parser';
import * as cors from 'cors';
import todoRoutes from './routes/TodoRoutes';
import { AppDataSource } from './common/config/environment';

AppDataSource.initialize().then(() => {
  const app = express();
  app.use(cors());
  app.use(BodyParser.json());

  app.use('/todos', todoRoutes);

  app.listen(8080, () => console.log('App is running ...!'));
});
