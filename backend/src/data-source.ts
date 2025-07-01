import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Task } from './entity/Task';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './data/sqlite.db',
  synchronize: true, // Cria tabelas se não existirem
  entities: [Task],
});
