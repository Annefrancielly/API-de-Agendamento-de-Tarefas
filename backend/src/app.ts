import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import tasksRoutes from './routes/tasks.routes';
import authRoutes from './routes/auth.routes';
import '../queue/notificationQueue';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/tasks', tasksRoutes);
app.use('/auth', authRoutes);

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'Jet Task API', version: '1.0.0' },
  },
  apis: ['./src/routes/*.ts'],
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
