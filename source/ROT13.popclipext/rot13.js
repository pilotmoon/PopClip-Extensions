"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// taken from https://github.com/rocktimsaikia/rot13-cipher/blob/master/src/index.js
const rot13_cipher_1 = __importDefault(require("rot13-cipher"));
const action = (selection) => (0, rot13_cipher_1.default)(selection.text);
action.after = 'paste-result';
exports.default = { action };
