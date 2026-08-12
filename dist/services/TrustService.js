"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrustService = void 0;
class TrustService {
    async addTrustedDevice(input) { return { ...input, trustScore: 100 }; }
    async ageTrust(current, days) { return Math.max(0, Math.round(current - Math.max(0, days) * 2)); }
}
exports.TrustService = TrustService;
