import type { ChatInputCommandInteraction } from 'discord.js'; export type Command={data:any;execute:(i:ChatInputCommandInteraction)=>Promise<void>};
