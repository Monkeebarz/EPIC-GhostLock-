"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../db/schema");
class CaseService {
    db;
    constructor(db) {
        this.db = db;
    }
    async createCase(input) { const [record] = await this.db.insert(schema_1.cases).values({ guildId: input.guildId, userId: input.userId, outcome: input.decision.outcome, status: input.decision.outcome === 'Allow + Log' ? 'logged' : 'open' }).returning(); await this.addTimelineEvent({ caseId: record.id, actorId: input.actorId, eventType: 'decision', detail: `${input.decision.outcome} at ${input.decision.score}/100`, metadata: { decision: input.decision } }); return record; }
    async addTimelineEvent(input) { const [event] = await this.db.insert(schema_1.caseTimelineEvents).values({ caseId: input.caseId, actorId: input.actorId, eventType: input.eventType, detail: input.detail, metadata: input.metadata ?? {} }).returning(); return event; }
    async linkRelatedCases(caseId, relatedCaseId, relation = 'identity-graph') { await this.db.insert(schema_1.caseLinks).values({ caseId, relatedCaseId, relation }).onConflictDoNothing(); return { caseId, relatedCaseId, relation }; }
    async getCase(caseId) { const [record] = await this.db.select().from(schema_1.cases).where((0, drizzle_orm_1.eq)(schema_1.cases.id, caseId)).limit(1); if (!record)
        return null; const timeline = await this.db.select().from(schema_1.caseTimelineEvents).where((0, drizzle_orm_1.eq)(schema_1.caseTimelineEvents.caseId, caseId)).orderBy((0, drizzle_orm_1.desc)(schema_1.caseTimelineEvents.createdAt)); return { ...record, timeline }; }
    async updateStatus(caseId, status, actorId) { const [record] = await this.db.update(schema_1.cases).set({ status, updatedAt: new Date() }).where((0, drizzle_orm_1.eq)(schema_1.cases.id, caseId)).returning(); if (record)
        await this.addTimelineEvent({ caseId, actorId, eventType: 'status-change', detail: `Case status changed to ${status}` }); return record; }
}
exports.CaseService = CaseService;
