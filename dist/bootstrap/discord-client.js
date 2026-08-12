"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDiscordClient = createDiscordClient;
const discord_js_1 = require("discord.js");
function createDiscordClient() { return new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMembers, discord_js_1.GatewayIntentBits.GuildMessages], partials: [discord_js_1.Partials.GuildMember] }); }
