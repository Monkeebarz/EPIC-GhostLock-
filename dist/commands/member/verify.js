"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = { data: new discord_js_1.SlashCommandBuilder().setName('verify').setDescription('Start EPIC Ghost Lock verification'), async execute(i) { await i.reply({ content: 'Verification started. Follow the instructions sent by EPIC Ghost Lock.', ephemeral: true }); } };
