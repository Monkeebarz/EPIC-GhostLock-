"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCommands = loadCommands;
const verify = __importStar(require("./member/verify"));
const trustDevice = __importStar(require("./member/trust-device"));
const help_1 = __importDefault(require("./member/help"));
const checkUser = __importStar(require("./mod/check-user"));
const purge = __importStar(require("./mod/purge"));
const caseCommand = __importStar(require("./mod/case"));
const allowClaim = __importStar(require("./mod/allow-claim"));
const settings = __importStar(require("./admin/settings"));
const trustAdd = __importStar(require("./admin/trust-add"));
const watchlist = __importStar(require("./admin/watchlist"));
function loadCommands() {
    return [
        verify.command,
        trustDevice.command,
        help_1.default,
        checkUser.command,
        purge.command,
        caseCommand.command,
        allowClaim.command,
        settings.command,
        trustAdd.command,
        watchlist.command,
    ];
}
