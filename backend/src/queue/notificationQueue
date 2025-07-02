import { Queue, Worker, Job } from 'bullmq';
import IORedis from 'ioredis'; 
import axios from 'axios';

// Configuração robusta para conexão com Redis
const redisConnection = {
  host: process.env.REDIS_HOST || 'redis',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
};

// Criação da fila (Queue) e do agendador (QueueScheduler) para evitar jobs travados
export const notificationQueue = new Queue('notifications', { connection: redisConnection });
//new QueueScheduler('notifications', { connection: redisConnection }); // agendamentos e retries

// Worker: processa os jobs agendados
export const notificationWorker = new Worker(
  'notifications',
  async (job: Job) => {
    const { task } = job.data;
    try {
      await axios.post(task.webhookUrl, {
        taskId: task.id,
        title: task.title,
        description: task.description,
        executeAt: task.executeAt,
      });
      console.log('[Notificação] Webhook enviado com sucesso para:', task.webhookUrl);
    } catch (err: any) {
      console.error('[Notificação] Falha ao enviar webhook:', err.message);
    }
  },
  { connection: redisConnection }
);

notificationWorker.on('completed', job => {
  console.log(`[Fila] Job ${job.id} processado com sucesso`);
});
notificationWorker.on('failed', (job, err) => {
  console.error(`[Fila] Job ${job?.id} falhou:`, err.message);
});
