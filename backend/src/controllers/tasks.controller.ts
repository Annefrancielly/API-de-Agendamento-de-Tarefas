import { Request, Response } from 'express';
import * as taskService from '../service/tasks.service';

// Listar tarefas
export async function listTasks(req: Request, res: Response) {
  try {
    const tasks = await taskService.listTasks();
    return res.status(200).json(tasks);
  } catch (err) {
    console.error('Erro ao listar tarefas:', err);
    return res.status(500).json({ error: 'Erro ao listar tarefas.' });
  }
}

// Criar tarefa
export async function createTask(req: Request, res: Response) {
  try {
    const task = await taskService.addTask(req.body);
    return res.status(201).json(task);
  } catch (err: any) {
    if (err.message && err.message.includes('executeAt')) {
      return res.status(400).json({ error: err.message });
    }
    console.error('Erro ao criar tarefa:', err);
    return res.status(500).json({ error: 'Erro ao criar tarefa.' });
  }
}
