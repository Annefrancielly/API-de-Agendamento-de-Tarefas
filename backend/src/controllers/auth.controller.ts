import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  // Exemplo: use banco real ou simulação, como seu desafio pede!
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign(
      { userId: username },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
    return res.status(200).json({ token });
  }
  return res.status(401).json({ error: 'Credenciais inválidas' });
};
