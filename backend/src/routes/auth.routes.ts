import { Router } from 'express';
import { login } from '../controllers/auth.controller'; // Importação nomeada

const router = Router();

router.post('/login', login);

export default router;
