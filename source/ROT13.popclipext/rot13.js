"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rot13_cipher_1 = require("rot13-cipher");
const action = (selection) => (0, rot13_cipher_1.default)(selection.text);
action.after = 'paste-result';
exports.default = { action };
