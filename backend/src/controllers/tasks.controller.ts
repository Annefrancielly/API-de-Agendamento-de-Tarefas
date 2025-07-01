import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Task } from '../entity/Task';

export async function listTasks(_req: Request, res: Response) {
  const repo = AppDataSource.getRepository(Task);
  const tasks = await repo.find({ order: { executeAt: 'ASC' } });
  res.json(tasks);
}

export async function createTask(req: Request, res: Response) {
  const { title, description, executeAt, webhookUrl } = req.body;
  if (!title || !executeAt || !webhookUrl) {
    return res.status(400).json({ error: 'Campos obrigatórios não informados' });
  }
  if (new Date(executeAt) <= new Date()) {
    return res.status(400).json({ error: 'Data deve ser futura' });
  }

  const repo = AppDataSource.getRepository(Task);
  const task = repo.create({ title, description, executeAt, webhookUrl });
  await repo.save(task);
  res.status(201).json(task);
}
