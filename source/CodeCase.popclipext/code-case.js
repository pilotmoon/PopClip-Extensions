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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("core-js/es/string/match-all"); // temporary until next popclip version
const ca = __importStar(require("case-anything"));
const config = [
    { icon: 'camel-case.svg', method: 'camelCase', title: 'camelCase' },
    { icon: 'pascal-case.svg', method: 'upperCamelCase', title: 'UpperCamelCase' },
    { icon: 'kebab-case.svg', method: 'kebabCase', title: 'kebab-case' },
    { icon: 'snake-case.svg', method: 'snakeCase', title: 'snake_case' },
    { icon: 'const-case.svg', method: 'constantCase', title: 'CONSTANT_CASE' }
];
const actions = config.map(config => {
    const action = {
        code(input) {
            return ca[config.method](input.text);
        },
        requirements: ['text', `option-${config.method}=1`],
        title: config.title,
        icon: config.icon,
        after: 'paste-result'
    };
    return action;
});
const options = config.map(config => {
    const action = {
        identifier: config.method,
        label: config.title,
        type: 'boolean',
        icon: config.icon
    };
    return action;
});
const extension = { actions, options };
exports.default = extension;
