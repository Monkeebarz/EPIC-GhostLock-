"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const loader_1 = require("./loader");
async function main() {
    const token = process.env.DISCORD_TOKEN;
    const clientId = process.env.DISCORD_CLIENT_ID;
    const guildId = process.env.DISCORD_GUILD_ID ?? '1460764693604864202';
    if (!token || !clientId)
        throw new Error('DISCORD_TOKEN and DISCORD_CLIENT_ID are required');
    const rest = new discord_js_1.REST({ version: '10' }).setToken(token);
    const commands = (0, loader_1.loadCommands)();
    await rest.put(discord_js_1.Routes.applicationGuildCommands(clientId, guildId), { body: commands.map((c) => c.data.toJSON()) });
    console.log(`Registered ${commands.length} guild commands for ${guildId}`);
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
