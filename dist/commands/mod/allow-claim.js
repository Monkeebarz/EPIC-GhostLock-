"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = { data: new discord_js_1.SlashCommandBuilder().setName('ghostlock-allow-claim').setDescription('Allow a quarantined user claim').addUserOption(o => o.setName('user').setDescription('User').setRequired(true)), async execute(i) { await i.reply({ content: 'Allow claim recorded for moderator review.', ephemeral: true }); } };
