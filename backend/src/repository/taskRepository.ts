import { promises as fs } from 'fs'
import path from 'path'
import { Task } from '../entity/Task'  // crie essa interface se ainda não existir

const DATA_PATH = path.resolve(__dirname, '../../data/tasks.json')

// Garante que o arquivo existe
async function ensureFile() {
    try {
        await fs.access(DATA_PATH)
    } catch {
        await fs.mkdir(path.dirname(DATA_PATH), { recursive: true })
        await fs.writeFile(DATA_PATH, '[]', 'utf-8')
    }
}

export async function getAllTasks(): Promise<Task[]> {
    await ensureFile()
    const content = await fs.readFile(DATA_PATH, 'utf-8')
    return JSON.parse(content) as Task[]
}

export async function createTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
    const tasks = await getAllTasks()
    const newTask: Task = {
        id: tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
        createdAt: new Date().toISOString(),
        ...task,
    }
    tasks.push(newTask)
    await fs.writeFile(DATA_PATH, JSON.stringify(tasks, null, 2), 'utf-8')
    return newTask
}
