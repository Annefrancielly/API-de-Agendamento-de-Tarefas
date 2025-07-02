import { DataSource } from 'typeorm';
import { Task } from './entity/Task';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './data/database.sqlite',
  synchronize: true,
  logging: false,
  entities: [Task],
});
