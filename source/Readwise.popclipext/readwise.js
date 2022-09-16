"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.action = void 0;
const axios_1 = require("axios");
const readwise = axios_1.default.create({ baseURL: 'https://readwise.io/api/v2/' });
const action = async (input, options, context) => {
    const payload = { text: input.text };
    if (context.browserUrl.length > 0) {
        payload.source_url = context.browserUrl;
    }
    if (context.browserTitle.length > 0) {
        payload.title = context.browserTitle;
    }
    await readwise.post('highlights/', { highlights: [payload] }, { headers: { Authorization: `Token ${options.authsecret}` } });
    return null;
};
exports.action = action;
const auth = async (info) => {
    const response = await readwise.get('auth/', { headers: { Authorization: `Token ${info.password}` } });
    if (response.status !== 204) {
        throw new Error('Not logged in');
    }
    return info.password;
};
exports.auth = auth;
