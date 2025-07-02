import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from './config/swagger'; // ajuste o caminho
import tasksRoutes from './routes/tasks.routes';
import authRoutes from './routes/auth.routes';
import "./queue/notificationQueue";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/tasks', tasksRoutes);
app.use('/auth', authRoutes);

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/docs-json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

export default app;
