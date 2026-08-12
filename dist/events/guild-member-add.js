"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerGuildMemberAdd = registerGuildMemberAdd;
function registerGuildMemberAdd(client) { client.on('guildMemberAdd', member => { console.log(JSON.stringify({ event: 'guildMemberAdd', guildId: member.guild.id, userId: member.id })); }); }
