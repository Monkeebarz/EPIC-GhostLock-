import type { Command } from './types';
import * as verify from './member/verify';
import * as trustDevice from './member/trust-device';
import helpCommand from './member/help';
import * as checkUser from './mod/check-user';
import * as purge from './mod/purge';
import * as caseCommand from './mod/case';
import * as allowClaim from './mod/allow-claim';
import * as settings from './admin/settings';
import * as trustAdd from './admin/trust-add';
import * as watchlist from './admin/watchlist';

export function loadCommands(): Command[] {
  return [
    verify.command,
    trustDevice.command,
    helpCommand,
    checkUser.command,
    purge.command,
    caseCommand.command,
    allowClaim.command,
    settings.command,
    trustAdd.command,
    watchlist.command,
  ];
}
