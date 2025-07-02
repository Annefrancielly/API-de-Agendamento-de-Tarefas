import IORedis from 'ioredis';
import { Queue } from 'bullmq';

const host = process.env.REDIS_HOST!;
const port = Number(process.env.REDIS_PORT || 6379);

// OBS: o BullMQ exige maxRetriesPerRequest = null
const connection = new IORedis({ host, port, maxRetriesPerRequest: null });

export const notificationQueue = new Queue('notification', { connection });
