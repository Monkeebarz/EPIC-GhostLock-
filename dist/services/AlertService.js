"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertService = void 0;
const discord_js_1 = require("discord.js");
const embed_builder_1 = require("../utils/embed-builder");
class AlertService {
    client;
    constructor(client) {
        this.client = client;
    }
    async sendDecision(channelId, decision, subject, caseId) { const channel = await this.client.channels.fetch(channelId); if (!(channel instanceof discord_js_1.TextChannel))
        throw new Error('Alert channel is not a text channel'); return channel.send({ embeds: [(0, embed_builder_1.decisionEmbed)(decision, subject, caseId)] }); }
}
exports.AlertService = AlertService;
