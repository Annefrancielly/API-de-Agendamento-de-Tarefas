import { Options } from "swagger-jsdoc";

export const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Jet Task API',
      version: '1.0.0',
      description: 'API para cadastro, listagem e notificação de tarefas.'
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Servidor local' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Task: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'Comprar pão' },
            description: { type: 'string', example: 'Padaria da esquina' },
            executeAt: { type: 'string', format: 'date-time', example: '2025-06-30 T14:00:00.000Z' },
            webhookUrl: { type: 'string', example: 'https://annesiqueiradev.app.n8n.cloud/webhook/tasks' },
            createdAt: { type: 'string', format: 'date-time', example: '2025-06-28 T12:34:56.000Z' }
          },
          required: ['id', 'title', 'executeAt', 'webhookUrl', 'createdAt']
        }
      }
    },
    security: [
      { bearerAuth: [] }
    ]
  },
  apis: ['src/routes/*.ts']
};