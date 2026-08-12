"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = { data: new discord_js_1.SlashCommandBuilder().setName('trust-device').setDescription('Mark this device as trusted'), async execute(i) { await i.reply({ content: 'This device has been submitted for trust confirmation.', ephemeral: true }); } };
