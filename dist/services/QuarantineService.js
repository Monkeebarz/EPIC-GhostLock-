"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuarantineService = void 0;
class QuarantineService {
    async quarantine(member, roleId) { if (roleId)
        await member.roles.add(roleId); return { userId: member.id, status: 'quarantined' }; }
    async release(member, roleId) { if (roleId)
        await member.roles.remove(roleId); return { userId: member.id, status: 'released' }; }
}
exports.QuarantineService = QuarantineService;
