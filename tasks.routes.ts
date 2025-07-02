import { Router } from 'express';
import { listTasks, createTask } from '../controllers/tasks.controller';
import { authenticateJwt } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @openapi
 * /tasks:
 *   get:
 *     summary: Lista todas as tarefas agendadas
 *     tags:
 *       - Tasks
 *     responses:
 *       200:
 *         description: Lista de tarefas cadastradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get('/', listTasks);

/**
 * @openapi
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa agendada
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Comprar pão
 *               description:
 *                 type: string
 *                 example: Padaria da esquina
 *               executeAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-06-30T14:00:00.000Z
 *               webhookUrl:
 *                 type: string
 *                 example: https://webhook.site/abcdef
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/', authenticateJwt, createTask);

export default router;
