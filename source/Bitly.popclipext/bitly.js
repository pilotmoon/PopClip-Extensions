"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.action = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const axios_1 = require("@popclip/axios");
const replace_ranges_1 = require("@popclip/helpers/replace-ranges");
const generator_1 = require("@popclip/helpers/generator");
const client_json_1 = require("./client.json");
// bitly api endpoint
const bitly = axios_1.default.create({ baseURL: 'https://api-ssl.bitly.com/', headers: { Accept: 'application/json' } });
async function shorten(url) {
    const headers = { Authorization: `Bearer ${popclip.options.authsecret}` };
    const response = await bitly.post('v4/shorten', { long_url: url }, { headers });
    return response.data.link;
}
// replace all matched urls with their shortened equivalents, calling duplicates only once
const action = async (input) => {
    return await (0, replace_ranges_1.replaceRangesAsync)(input.text, input.data.urls.ranges, (0, generator_1.concurrentTransform)(input.data.urls, shorten));
};
exports.action = action;
// sign in to bitly using authorization flow
const auth = async (info, flow) => {
    const redirect_uri = 'popclip://callback?popclip_ext_id=' + info.identifier; // old style callback is registered with bitly
    const { client_id, client_secret } = util.clarify(client_json_1.client);
    const { code } = await flow('https://bitly.com/oauth/authorize', { client_id, redirect_uri });
    const response = await bitly.post('oauth/access_token', new URLSearchParams({ client_id, client_secret, redirect_uri, code }));
    return response.data.access_token;
};
exports.auth = auth;
