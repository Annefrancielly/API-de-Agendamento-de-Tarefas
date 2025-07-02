import { AppDataSource } from '../data-source';
import { Task } from '../entity/Task';
import { notificationQueue } from '../infrastructure/queue/notificationQueue';

interface TaskInput {
  title: string;
  description: string;
  executeAt: string;
  webhookUrl: string;
}

// Listar tarefas
export async function listTasks(): Promise<Task[]> {
  const repo = AppDataSource.getRepository(Task);
  return repo.find({ order: { executeAt: 'ASC' } });
}

// Criar tarefa
export async function addTask(input: TaskInput): Promise<Task> {
  // Validação básica
  const execDate = new Date(input.executeAt);
  if (execDate <= new Date()) {
    throw new Error('executeAt deve ser uma data futura.');
  }

  const repo = AppDataSource.getRepository(Task);
  const task = repo.create(input);  
  await repo.save(task);

  const notifyDate = new Date(execDate.getTime() - 5 * 60 * 1000);
  const delay = Math.max(0, notifyDate.getTime() - Date.now());

  await notificationQueue.add('task', { task }, { delay, attempts: 3 });  // Salva no banco
  return task;
}
