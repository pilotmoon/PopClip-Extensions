"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.auth = exports.action = void 0;
/**
 * PopClip Extension for Pinboard
 * API docs: https://pinboard.in/api/
 */
const axios_1 = require("axios");
const p = axios_1.default.create({ baseURL: 'https://api.pinboard.in/v1/', params: { format: 'json' } });
// add url to pinboard
// uses page title as description if page url matches selected url
const action = async (selection, options, context) => {
    const token = `${options.username}:${options.authsecret}`;
    const url = selection.data.urls[0];
    const description = context.browserUrl === url ? context.browserTitle : '';
    await p.get('posts/add', { params: { url, description, auth_token: token } });
};
exports.action = action;
// retreive user's api token using basic http authentication
const auth = async (info) => {
    return (await p.get('user/api_token', { auth: info })).data.result;
};
exports.auth = auth;
// options
exports.options = [
    { identifier: 'username', type: 'string', label: util.localize('Username') },
    { identifier: 'password', type: 'password', label: util.localize('Password') }
];
