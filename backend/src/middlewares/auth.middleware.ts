import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'supersecret';

export function authenticateJwt(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token não informado.' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token inválido.' });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(401).json({ error: 'Token inválido.' });
    (req as any).user = user;
    next();
  });
}
