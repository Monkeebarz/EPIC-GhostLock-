"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerInteractionHandler = registerInteractionHandler;
const loader_1 = require("../commands/loader");
function registerInteractionHandler(client) { const commands = new Map((0, loader_1.loadCommands)().map(c => [c.data.name, c])); client.on('interactionCreate', async (i) => { if (!i.isChatInputCommand())
    return; const command = commands.get(i.commandName); if (!command)
    return; try {
    await command.execute(i);
}
catch (error) {
    console.error(error);
    if (i.replied || i.deferred)
        await i.editReply('Ghost Lock encountered an internal error.');
    else
        await i.reply({ content: 'Ghost Lock encountered an internal error.', ephemeral: true });
} }); }
