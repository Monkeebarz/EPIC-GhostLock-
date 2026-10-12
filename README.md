# EPIC Ghost Lock

EPIC Ghost Lock is a Discord security and verification bot for identity-risk detection, quarantine, watchlists, and moderator case management.

## Risk policy

| Score | Outcome | Action |
|---:|---|---|
| 0–29 | Allow + Log | Permit access and record the decision |
| 30–69 | Quarantine | Limit access and open a moderator case |
| 70–100 | Auto-Block | Block the member and alert moderators |

The scoring engine combines deterministic, probabilistic, network, velocity, and trust signals. It clamps all scores to 0–100 and emits reason codes for every non-zero contribution.

## Moderation commands

- `/purge amount:<1–100>` deletes up to the requested number of newest messages in the current server text channel. The user needs **Manage Messages** (administrators also qualify); the bot needs **View Channel**, **Read Message History**, and **Manage Messages** in that channel.
- Discord does not allow bulk deletion of messages older than 14 days. `/purge` leaves those messages untouched and reports how many were skipped. A single eligible message is deleted individually because Discord rejects one-message bulk-delete batches.

## Local development

Copy `.env.example` to `.env`, fill in the Discord token, then run `docker compose up -d postgres redis`, `npm install`, `npm run db:migrate`, and `npm run dev`. Register commands for the example guild with `npm run register`.

Run `npm test` for the focused `/purge` unit tests and `npm run typecheck` for the project TypeScript check.

The example guild ID is `1460764693604864202`. Commands are registered guild-scoped, never globally, to avoid propagation delays and duplicates.
