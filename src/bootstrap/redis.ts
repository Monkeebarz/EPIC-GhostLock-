import Redis from 'ioredis';
export function createRedis(url = process.env.REDIS_URL ?? 'redis://localhost:6379') { const redis = new Redis(url, { maxRetriesPerRequest: 2, lazyConnect: true }); return redis; }
