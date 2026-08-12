"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphService = void 0;
class GraphService {
    async linkIdentity(input) { return { connected: true, ...input }; }
    async relatedIdentities(userId) { return { userId, nodes: [], edges: [] }; }
}
exports.GraphService = GraphService;
