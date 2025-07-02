import { Router } from 'express';
import { listTasks, createTask } from '../controllers/tasks.controller';
import { authenticateJwt } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', listTasks);
router.post('/', authenticateJwt, createTask);

export default router;
