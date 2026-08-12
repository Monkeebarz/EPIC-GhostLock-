"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiskEngine = void 0;
class RiskEngine {
    evaluate(input) {
        const reasons = [];
        const breakdown = { deterministic: 0, probabilistic: 0, network: 0, velocity: 0, trust: 0 };
        const add = (code, category, points, detail) => { const p = Math.max(0, Math.round(points)); if (!p)
            return; breakdown[category] += p; reasons.push({ code, category, points: p, detail }); };
        if (input.watchlistMatch)
            add('WATCHLIST_MATCH', 'deterministic', 70, 'Subject matched an active watchlist selector');
        if (input.profileMismatch)
            add('PROFILE_MISMATCH', 'deterministic', 15, 'Profile signals are inconsistent with the account history');
        if (input.sharedFingerprint)
            add('SHARED_FINGERPRINT', 'network', 25, 'Fingerprint is shared with a flagged identity');
        if (input.accountAgeDays < 1)
            add('ACCOUNT_NEW', 'probabilistic', 20, 'Account is less than one day old');
        else if (input.accountAgeDays < 7)
            add('ACCOUNT_NEW', 'probabilistic', 10, 'Account is less than one week old');
        if (input.probabilisticRisk)
            add('PROBABILISTIC_RISK', 'probabilistic', input.probabilisticRisk, 'Model-derived behavior risk');
        if (input.networkRisk)
            add('NETWORK_RISK', 'network', input.networkRisk, 'Network reputation contribution');
        if ((input.joinCountLastMinute ?? 0) >= 10)
            add('JOIN_BURST', 'velocity', 20, 'Guild join velocity indicates a burst');
        else if ((input.joinCountLastMinute ?? 0) >= 5)
            add('JOIN_BURST', 'velocity', 10, 'Elevated guild join velocity');
        if (input.trustedDevice)
            add('TRUSTED_DEVICE', 'trust', -Math.min(25, input.trustScore ?? 25), 'Trusted device offset');
        else if (input.trustScore !== undefined && input.trustScore < 30)
            add('TRUST_DECAY', 'trust', 15, 'Trust score has decayed below the safe threshold');
        const raw = Object.values(breakdown).reduce((a, b) => a + b, 0);
        const score = Math.max(0, Math.min(100, raw));
        const outcome = score >= 70 ? 'Auto-Block' : score >= 30 ? 'Quarantine' : 'Allow + Log';
        const severity = score >= 85 ? 'critical' : score >= 70 ? 'high' : score >= 30 ? 'medium' : 'low';
        return { score, outcome, severity, reasons, breakdown };
    }
}
exports.RiskEngine = RiskEngine;
