"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisKeys = void 0;
exports.redisKeys = { joinVelocity: (guildId) => `ghostlock:velocity:join:${guildId}`, userLock: (guildId, userId) => `ghostlock:lock:${guildId}:${userId}`, graph: (userId) => `ghostlock:graph:${userId}` };
