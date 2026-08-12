import { REST, Routes } from 'discord.js';
import { loadCommands } from './loader';

async function main(): Promise<void> {
  const token = process.env.DISCORD_TOKEN;
  const clientId = process.env.DISCORD_CLIENT_ID;
  const guildId = process.env.DISCORD_GUILD_ID ?? '1460764693604864202';
  if (!token || !clientId) throw new Error('DISCORD_TOKEN and DISCORD_CLIENT_ID are required');
  const rest = new REST({ version: '10' }).setToken(token);
  const commands = loadCommands();
  await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands.map((c) => c.data.toJSON()) });
  console.log(`Registered ${commands.length} guild commands for ${guildId}`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
