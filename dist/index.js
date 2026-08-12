"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pino_1 = __importDefault(require("pino"));
const postgres_1 = require("./bootstrap/postgres");
const redis_1 = require("./bootstrap/redis");
const discord_client_1 = require("./bootstrap/discord-client");
const interaction_handler_1 = require("./events/interaction-handler");
const guild_member_add_1 = require("./events/guild-member-add");
const logger = (0, pino_1.default)({ level: process.env.LOG_LEVEL ?? 'info' });
const app = (0, express_1.default)();
app.get('/health', (_, res) => res.json({ ok: true, service: 'epic-ghostlock' }));
const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => logger.info({ port }, 'HTTP server listening'));
const { db } = (0, postgres_1.createDatabase)();
const redis = (0, redis_1.createRedis)();
const client = (0, discord_client_1.createDiscordClient)();
(0, interaction_handler_1.registerInteractionHandler)(client);
(0, guild_member_add_1.registerGuildMemberAdd)(client);
client.once('ready', c => logger.info({ user: c.user.tag }, 'Discord client ready'));
const shutdown = async () => { await redis.quit(); logger.info('Shutdown complete'); process.exit(0); };
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
if (process.env.DISCORD_TOKEN)
    client.login(process.env.DISCORD_TOKEN).catch(error => { logger.error(error, 'Discord login failed'); process.exitCode = 1; });
else
    logger.warn('DISCORD_TOKEN not set; HTTP-only mode');
void db;
