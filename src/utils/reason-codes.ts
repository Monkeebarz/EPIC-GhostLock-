export type SignalCategory = 'deterministic' | 'probabilistic' | 'network' | 'velocity' | 'trust';
export type ReasonCode = { code: string; category: SignalCategory; points: number; detail: string };
export const REASON_CODES = { WATCHLIST_MATCH: 'WATCHLIST_MATCH', ACCOUNT_NEW: 'ACCOUNT_NEW', PROFILE_MISMATCH: 'PROFILE_MISMATCH', SHARED_FINGERPRINT: 'SHARED_FINGERPRINT', JOIN_BURST: 'JOIN_BURST', TRUSTED_DEVICE: 'TRUSTED_DEVICE', TRUST_DECAY: 'TRUST_DECAY' } as const;
