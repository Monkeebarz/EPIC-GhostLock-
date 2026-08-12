"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationService = void 0;
class VerificationService {
    db;
    constructor(db) {
        this.db = db;
    }
    async start(guildId, discordUserId) { return { guildId, discordUserId, status: 'pending', challenge: crypto.randomUUID(), expiresAt: new Date(Date.now() + 15 * 60_000) }; }
    async complete(sessionId) { return { sessionId, status: 'verified' }; }
}
exports.VerificationService = VerificationService;
