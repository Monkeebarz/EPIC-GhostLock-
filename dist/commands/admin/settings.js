"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = { data: new discord_js_1.SlashCommandBuilder().setName('ghostlock-settings').setDescription('View Ghost Lock settings'), async execute(i) { await i.reply({ content: 'Settings are managed per guild. Configure database-backed roles and alert channels.', ephemeral: true }); } };
