"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimit = rateLimit;
async function rateLimit(redis, key, limit, windowSeconds) { const count = await redis.incr(key); if (count === 1)
    await redis.expire(key, windowSeconds); return count <= limit; }
