import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';
import type { GhostLockCommand } from '../types.js';

const helpCommand: GhostLockCommand = {
  data: new SlashCommandBuilder()
    .setName('ghostlock-help')
    .setDescription('Show EPIC Ghost Lock setup guide and command list'),

  async execute(interaction: ChatInputCommandInteraction) {
    const setupEmbed = new EmbedBuilder()
      .setColor(0x6A0DAD)
      .setTitle('👻 EPIC Ghost Lock — Setup Guide')
      .setDescription('Protect your server with intelligent risk assessment. Follow these steps to get started.')
      .addFields(
        {
          name: '📋 STEP 1: Set Verification Channel',
          value: [
            'Create a channel where new members land (e.g. #verify-here)',
            'Run: `/ghostlock settings`',
            'Set **Verification Channel** to your channel',
            'New members will ONLY see this channel until verified',
          ].join('\n'),
          inline: false,
        },
        {
          name: '📋 STEP 2: Set Alert/Case Log Channel',
          value: [
            'Create a private mod channel (e.g. #ghostlock-logs)',
            'Run: `/ghostlock settings`',
            'Set **Alert Channel** to your mod channel',
            'Ghost Lock posts risk assessments here for every join',
          ].join('\n'),
          inline: false,
        },
        {
          name: '📋 STEP 3: Set Quarantine Role',
          value: [
            'Create a role with limited permissions (e.g. @Quarantined)',
            'Run: `/ghostlock settings`',
            'Set **Quarantine Role** to this role',
            'Medium-risk users get this role for manual review',
          ].join('\n'),
          inline: false,
        },
        {
          name: '📋 STEP 4: Set Risk Thresholds (Optional)',
          value: [
            'Default: 0-29 = Allow, 30-69 = Quarantine, 70-100 = Auto-Block',
            'Adjust with `/ghostlock settings` if needed',
            'Lower thresholds = stricter, higher = more lenient',
          ].join('\n'),
          inline: false,
        },
      )
      .setFooter({ text: 'EPIC Ghost Lock • Smarter Moderation, Stronger Communities' });

    const commandsEmbed = new EmbedBuilder()
      .setColor(0xD4AF37)
      .setTitle('⚡ Command Reference')
      .addFields(
        {
          name: '👤 Member Commands',
          value: [
            '`/verify` — Complete verification to gain server access',
            '`/trust-device` — Mark your device as trusted (lowers future risk)',
            '`/ghostlock-help` — Show this guide',
          ].join('\n'),
          inline: false,
        },
        {
          name: '🛡️ Mod Commands',
          value: [
            '`/ghostlock check-user [user]` — Run risk scan on any member',
            '`/ghostlock case [id]` — View full case with timeline',
            '`/ghostlock allow-claim [user]` — Clear a quarantined user',
          ].join('\n'),
          inline: false,
        },
        {
          name: '⚙️ Admin Commands',
          value: [
            '`/ghostlock settings` — Configure channels, roles, thresholds',
            '`/ghostlock trust add [selector]` — Whitelist a device/IP/pattern',
            '`/ghostlock watchlist add [user]` — Flag user for instant detection',
            '`/ghostlock watchlist remove [user]` — Remove from watchlist',
          ].join('\n'),
          inline: false,
        },
      )
      .setFooter({ text: 'All commands are guild-specific • No global registration delays' });

    const howItWorksEmbed = new EmbedBuilder()
      .setColor(0xFF4444)
      .setTitle('🔍 How Risk Assessment Works')
      .setDescription('Every join triggers a multi-layer scan:')
      .addFields(
        {
          name: '📊 Signal Categories',
          value: [
            '**Deterministic** — Account age, avatar, profile completeness',
            '**Probabilistic** — Behavioral patterns, join timing',
            '**Network** — IP analysis, VPN/proxy detection',
            '**Velocity** — How many accounts from same source recently',
            '**Trust** — Trusted devices, verified history, vouches',
          ].join('\n'),
          inline: false,
        },
        {
          name: '🎯 Three Outcomes',
          value: [
            '🟢 **ALLOW** (0-29) — Low risk, granted access, logged for records',
            '🟡 **QUARANTINE** (30-69) — Limited access, mod review required',
            '🔴 **AUTO-BLOCK** (70-100) — High confidence threat, instant block',
          ].join('\n'),
          inline: false,
        },
        {
          name: '📬 What Mods See',
          value: [
            'An infographic embed in your alert channel with:',
            '• Risk score meter (colored 0-100)',
            '• Signal breakdown by category',
            '• Reason codes (NEW_ACCOUNT, SHARED_DEVICE, VPN, etc.)',
            '• Action buttons: [Allow] [Quarantine] [Block] [View Case]',
          ].join('\n'),
          inline: false,
        },
      )
      .setFooter({ text: 'Ghost Lock catches alts through device fingerprints & network overlap' });

    await interaction.reply({
      embeds: [setupEmbed, commandsEmbed, howItWorksEmbed],
      ephemeral: true,
    });
  },
};

export default helpCommand;
