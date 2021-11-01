"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.action = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
// reimplementation of Bitly ext (as callback auth test)
const axios_1 = require("axios");
const client_json_1 = require("./client.json");
const replace_1 = require("./@popclip/replace");
const bitly = axios_1.default.create({ baseURL: 'https://api-ssl.bitly.com/', headers: { Accept: 'application/json' } });
// generator: yield short urls from the input array of long urls
async function* shorten(urls) {
    const headers = { Authorization: `Bearer ${popclip.options.authsecret}` };
    for (const long_url of urls) {
        const response = await bitly.post('v4/shorten', { long_url }, { headers });
        yield response.data.link;
    }
}
// replace all matched urls with their shortened equivalents
const action = async (input) => {
    return await (0, replace_1.replaceRangesAsync)(input.text, input.data.urls.ranges, shorten(input.data.urls));
};
exports.action = action;
// sign in to bitly using authorization flow
const auth = async (info, flow) => {
    const redirect_uri = info.redirect;
    const { client_id, client_secret } = util.clarify(client_json_1.client);
    const { code } = await flow('https://bitly.com/oauth/authorize', { client_id, redirect_uri });
    const data = util.buildQuery({ client_id, client_secret, redirect_uri, code });
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const response = await bitly.post('oauth/access_token', data, { headers });
    return response.data.access_token;
};
exports.auth = auth;
