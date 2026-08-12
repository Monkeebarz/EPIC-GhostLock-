"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = { data: new discord_js_1.SlashCommandBuilder().setName('ghostlock-watchlist').setDescription('Manage watchlist').addStringOption(o => o.setName('action').setDescription('add or remove').setRequired(true)).addStringOption(o => o.setName('selector').setDescription('Selector').setRequired(true)), async execute(i) { await i.reply({ content: 'Watchlist change recorded.', ephemeral: true }); } };
