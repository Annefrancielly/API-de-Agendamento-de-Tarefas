import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import axios from 'axios';

// Configura a conexão Redis 
const redisConnection = {
  host: process.env.REDIS_HOST || 'redis', 
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
};

export const notificationQueue = new Queue('notifications', { connection: redisConnection });

// Worker: processa jobs quando chega a hora
export const notificationWorker = new Worker(
  'notifications',
  async (job) => {
    const { task } = job.data;
    try {
      await axios.post(task.webhookUrl, {
        taskId: task.id,
        title: task.title,
        description: task.description,
        executeAt: task.executeAt,
      });
      console.log(' Webhook enviado com sucesso para:', task.webhookUrl);
    } catch (err: any) {
      console.error(' Falha ao enviar webhook:', err.message);
    }
  },
  { connection: redisConnection }
);
