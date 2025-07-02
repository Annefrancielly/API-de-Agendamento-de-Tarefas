import { Options } from 'swagger-jsdoc';
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

const swaggerDefinition = {
  openapi: '3.0.3',
  info: { title: 'API de Agendamento de Tarefas', version: '1.0.0' },
  servers: [{ url: 'http://localhost:3000' }],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
    },
    schemas: {
      Task: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          title: { type: 'string', example: 'Comprar pão' },
          description: { type: 'string', example: 'Padaria da esquina' },
          executeAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-06-30T14:00:00.000Z'
          },
          webhookUrl: {
            type: 'string',
            example: 'https://webhook.site/abcdef'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-06-28T12:34:56.000Z'
          }
        },
        required: ['id', 'title', 'executeAt', 'webhookUrl', 'createdAt']
      }
    }
  },
  security: [{ bearerAuth: [] }]
};

export const swaggerOptions: Options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../routes/*.ts')] // só aponta para seus arquivos de rota
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
