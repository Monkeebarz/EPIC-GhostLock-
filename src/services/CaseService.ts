import { and, desc, eq } from 'drizzle-orm';
import { cases, caseLinks, caseTimelineEvents } from '../db/schema';
import type { Decision } from './RiskEngine';
export class CaseService {
  constructor(private readonly db:any) {}
  async createCase(input:{guildId:string; userId:string; decision:Decision; actorId?:string}) { const [record]=await this.db.insert(cases).values({guildId:input.guildId,userId:input.userId,outcome:input.decision.outcome,status:input.decision.outcome==='Allow + Log'?'logged':'open'}).returning(); await this.addTimelineEvent({caseId:record.id,actorId:input.actorId,eventType:'decision',detail:`${input.decision.outcome} at ${input.decision.score}/100`,metadata:{decision:input.decision}}); return record; }
  async addTimelineEvent(input:{caseId:string;actorId?:string;eventType:string;detail:string;metadata?:Record<string,unknown>}) { const [event]=await this.db.insert(caseTimelineEvents).values({caseId:input.caseId,actorId:input.actorId,eventType:input.eventType,detail:input.detail,metadata:input.metadata??{}}).returning(); return event; }
  async linkRelatedCases(caseId:string,relatedCaseId:string,relation='identity-graph') { await this.db.insert(caseLinks).values({caseId,relatedCaseId,relation}).onConflictDoNothing(); return {caseId,relatedCaseId,relation}; }
  async getCase(caseId:string) { const [record]=await this.db.select().from(cases).where(eq(cases.id,caseId)).limit(1); if(!record)return null; const timeline=await this.db.select().from(caseTimelineEvents).where(eq(caseTimelineEvents.caseId,caseId)).orderBy(desc(caseTimelineEvents.createdAt)); return {...record,timeline}; }
  async updateStatus(caseId:string,status:string,actorId?:string) { const [record]=await this.db.update(cases).set({status,updatedAt:new Date()}).where(eq(cases.id,caseId)).returning(); if(record)await this.addTimelineEvent({caseId,actorId,eventType:'status-change',detail:`Case status changed to ${status}`}); return record; }
}
