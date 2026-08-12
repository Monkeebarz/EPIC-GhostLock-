"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = { data: new discord_js_1.SlashCommandBuilder().setName('ghostlock-trust-add').setDescription('Trust a selector').addStringOption(o => o.setName('selector').setDescription('User/device selector').setRequired(true)), async execute(i) { await i.reply({ content: `Trusted selector: ${i.options.getString('selector')}`, ephemeral: true }); } };
