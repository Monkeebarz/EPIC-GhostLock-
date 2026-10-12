import {
  PermissionFlagsBits,
  SlashCommandBuilder,
  type Channel,
  type GuildTextBasedChannel,
  type Message,
} from 'discord.js';
import type { Command } from '../types';

export const DISCORD_BULK_DELETE_WINDOW_MS = 14 * 24 * 60 * 60 * 1000;

type TimestampedMessage = Pick<Message, 'createdTimestamp'>;

export function partitionPurgeMessages<T extends TimestampedMessage>(
  messages: Iterable<T>,
  now = Date.now(),
): { eligible: T[]; tooOld: T[] } {
  const cutoff = now - DISCORD_BULK_DELETE_WINDOW_MS;
  const eligible: T[] = [];
  const tooOld: T[] = [];

  for (const message of messages) {
    if (message.createdTimestamp > cutoff && message.createdTimestamp <= now) {
      eligible.push(message);
    } else {
      tooOld.push(message);
    }
  }

  return { eligible, tooOld };
}

function isGuildTextBasedChannel(channel: Channel | null): channel is GuildTextBasedChannel {
  return channel !== null && channel.isTextBased() && 'guild' in channel;
}

export const command: Command = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Delete up to 100 recent messages from this channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption((option) =>
      option
        .setName('amount')
        .setDescription('Number of recent messages to delete (1–100)')
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true),
    ),

  async execute(interaction) {
    const guild = interaction.guild;
    if (!interaction.inGuild() || !guild || !isGuildTextBasedChannel(interaction.channel)) {
      await interaction.reply({
        content: 'This command can only be used in a server text channel.',
        ephemeral: true,
      });
      return;
    }

    if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageMessages)) {
      await interaction.reply({
        content: 'You need the Manage Messages permission to use /purge.',
        ephemeral: true,
      });
      return;
    }

    const amount = interaction.options.getInteger('amount', true);
    const channel = interaction.channel;
    await interaction.deferReply({ ephemeral: true });

    try {
      const botMember = guild.members.me ?? (await guild.members.fetchMe());
      const botPermissions = channel.permissionsFor(botMember);
      const requiredBotPermissions = [
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.ReadMessageHistory,
        PermissionFlagsBits.ManageMessages,
      ];

      if (!botPermissions?.has(requiredBotPermissions)) {
        await interaction.editReply(
          'I need View Channel, Read Message History, and Manage Messages permissions in this channel to purge messages.',
        );
        return;
      }

      const recentMessages = await channel.messages.fetch({ limit: amount });
      const { eligible, tooOld } = partitionPurgeMessages(recentMessages.values());
      let deletedCount = 0;

      if (eligible.length === 1) {
        // Discord's bulk-delete endpoint rejects a one-message batch.
        await eligible[0].delete();
        deletedCount = 1;
      } else if (eligible.length > 1) {
        const deleted = await channel.bulkDelete(eligible, true);
        deletedCount = deleted.size;
      }

      let response = `Deleted ${deletedCount} message${deletedCount === 1 ? '' : 's'}.`;
      if (tooOld.length > 0) {
        response += ` Skipped ${tooOld.length} message${tooOld.length === 1 ? '' : 's'} older than 14 days; Discord does not allow those messages in a bulk delete.`;
      }

      await interaction.editReply(response);
    } catch (error) {
      console.error('Failed to purge channel messages:', error);
      await interaction.editReply(
        'Purge failed. Check that the bot has the required channel permissions, then try again.',
      );
    }
  },
};
