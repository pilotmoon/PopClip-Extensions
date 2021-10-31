"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.action = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
// reimplementation of Bitly ext (as callback auth test)
const axios_1 = require("axios");
const client_json_1 = require("./client.json");
const { client_id, client_secret } = util.clarify(client_json_1.client);
const bitly = axios_1.default.create({ baseURL: 'https://api-ssl.bitly.com/', headers: { Accept: 'application/json' } });
// shorten URL with bitly
const action = async (input, options) => {
    const access_token = options.authsecret;
    const response = await bitly.post('v4/shorten', {
        long_url: input.matchedText
    }, { headers: { Authorization: `Bearer ${access_token}` } });
    return response.data.link;
};
exports.action = action;
// sign in to bitly using authorization flow
const auth = async (info, flow) => {
    const redirect_uri = info.redirect;
    const { code } = await flow('https://bitly.com/oauth/authorize', { client_id, redirect_uri });
    const response = await bitly.post('oauth/access_token', util.buildQuery({
        client_id, client_secret, redirect_uri, code
    }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    return response.data.access_token;
};
exports.auth = auth;
