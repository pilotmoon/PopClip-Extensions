"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.action = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
// reimplementation of Bitly ext (as callback auth test)
const axios_1 = require("axios");
const client_json_1 = require("./client.json");
const replace_1 = require("./@popclip/replace");
const { client_id, client_secret } = util.clarify(client_json_1.client);
const bitly = axios_1.default.create({ baseURL: 'https://api-ssl.bitly.com/', headers: { Accept: 'application/json' } });
// replace all matched urls with thier shortened equivalents
const action = async (input) => {
    const access_token = popclip.options.authsecret;
    const shortUrls = [];
    for (const url of input.data.urls) {
        const response = await bitly.post('v4/shorten', { long_url: url }, {
            headers: { Authorization: `Bearer ${access_token}` }
        });
        shortUrls.push(response.data.link);
    }
    return (0, replace_1.replaceRanges)(input.text, input.data.urls.ranges, (_, index) => shortUrls[index]);
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
