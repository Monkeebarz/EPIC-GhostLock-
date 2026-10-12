import assert from 'node:assert/strict';
import { test } from 'node:test';
import { PermissionFlagsBits } from 'discord.js';
import { loadCommands } from '../src/commands/loader';
import {
  command,
  DISCORD_BULK_DELETE_WINDOW_MS,
  partitionPurgeMessages,
} from '../src/commands/mod/purge';

test('/purge is registered with moderator permissions and a required 1–100 amount', () => {
  const commands = loadCommands();
  const purge = commands.find((candidate) => candidate.data.name === 'purge');
  assert.ok(purge, 'expected /purge to be in the command registry');

  const json = purge.data.toJSON();
  assert.equal(json.default_member_permissions, String(PermissionFlagsBits.ManageMessages));
  const amount = json.options.find((option: { name: string }) => option.name === 'amount');
  assert.ok(amount, 'expected a required amount option');
  assert.equal(amount.required, true);
  assert.equal(amount.min_value, 1);
  assert.equal(amount.max_value, 100);
});

test('purge age partition excludes messages at or beyond Discord’s 14-day bulk-delete limit', () => {
  const now = Date.UTC(2026, 0, 15, 12, 0, 0);
  const cutoff = now - DISCORD_BULK_DELETE_WINDOW_MS;
  const messages = [
    { id: 'new', createdTimestamp: now - 1_000 },
    { id: 'just-inside', createdTimestamp: cutoff + 1 },
    { id: 'at-limit', createdTimestamp: cutoff },
    { id: 'too-old', createdTimestamp: cutoff - 1 },
  ];

  const { eligible, tooOld } = partitionPurgeMessages(messages, now);
  assert.deepEqual(eligible.map((message) => message.id), ['new', 'just-inside']);
  assert.deepEqual(tooOld.map((message) => message.id), ['at-limit', 'too-old']);
});

function createInteraction(amount: number, messageData: Array<{ id: string; createdTimestamp: number }>) {
  const individuallyDeleted: string[] = [];
  let bulkDeleted: string[] = [];
  let filterOldArgument: boolean | undefined;
  let replyText = '';

  const messages = new Map(
    messageData.map((message) => [
      message.id,
      {
        ...message,
        delete: async () => {
          individuallyDeleted.push(message.id);
        },
      },
    ]),
  );

  const channel = {
    guild: { id: 'guild-id' },
    isTextBased: () => true,
    permissionsFor: () => ({ has: () => true }),
    messages: { fetch: async () => messages },
    bulkDelete: async (batch: Array<{ id: string }>, filterOld: boolean) => {
      bulkDeleted = batch.map((message) => message.id);
      filterOldArgument = filterOld;
      return { size: batch.length };
    },
  };

  const interaction = {
    inGuild: () => true,
    guild: { members: { me: {}, fetchMe: async () => ({}) } },
    channel,
    memberPermissions: { has: () => true },
    options: { getInteger: () => amount },
    reply: async () => undefined,
    deferReply: async () => undefined,
    editReply: async (content: string) => {
      replyText = content;
    },
  };

  return {
    interaction,
    individuallyDeleted,
    get bulkDeleted() {
      return bulkDeleted;
    },
    get filterOldArgument() {
      return filterOldArgument;
    },
    get replyText() {
      return replyText;
    },
  };
}

test('/purge bulk-deletes only eligible messages and reports those skipped as too old', async () => {
  const now = Date.now();
  const scenario = createInteraction(3, [
    { id: 'recent-one', createdTimestamp: now - 1_000 },
    { id: 'recent-two', createdTimestamp: now - 2_000 },
    { id: 'old', createdTimestamp: now - DISCORD_BULK_DELETE_WINDOW_MS - 1_000 },
  ]);

  await command.execute(scenario.interaction as never);

  assert.deepEqual(scenario.bulkDeleted, ['recent-one', 'recent-two']);
  assert.equal(scenario.filterOldArgument, true);
  assert.deepEqual(scenario.individuallyDeleted, []);
  assert.match(scenario.replyText, /Deleted 2 messages\./);
  assert.match(scenario.replyText, /Skipped 1 message older than 14 days/);
});

test('/purge deletes a lone eligible message individually instead of making an invalid one-message bulk request', async () => {
  const scenario = createInteraction(1, [
    { id: 'single', createdTimestamp: Date.now() - 1_000 },
  ]);

  await command.execute(scenario.interaction as never);

  assert.deepEqual(scenario.individuallyDeleted, ['single']);
  assert.deepEqual(scenario.bulkDeleted, []);
  assert.equal(scenario.replyText, 'Deleted 1 message.');
});
