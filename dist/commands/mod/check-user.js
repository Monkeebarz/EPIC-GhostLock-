"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = { data: new discord_js_1.SlashCommandBuilder().setName('ghostlock-check-user').setDescription('Check a user risk profile').addUserOption(o => o.setName('user').setDescription('User to check').setRequired(true)), async execute(i) { await i.reply({ content: 'Risk profile lookup queued.', ephemeral: true }); } };
