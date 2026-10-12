import type { ChatInputCommandInteraction } from 'discord.js';

export type Command = {
  data: any;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
};

// Keep the name already used by the built-in help module as a compatibility alias.
export type GhostLockCommand = Command;
