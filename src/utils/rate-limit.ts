import Redis from 'ioredis';
export async function rateLimit(redis: Redis, key: string, limit: number, windowSeconds: number): Promise<boolean> { const count = await redis.incr(key); if (count === 1) await redis.expire(key, windowSeconds); return count <= limit; }
