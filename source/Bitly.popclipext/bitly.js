"use strict";
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.action = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
// reimplementation of Bitly ext (as callback auth test)
const axios_1 = require("axios");
const client_json_1 = require("./client.json");
const replace_1 = require("./@popclip/replace");
const { client_id, client_secret } = util.clarify(client_json_1.client);
const bitly = axios_1.default.create({ baseURL: 'https://api-ssl.bitly.com/', headers: { Accept: 'application/json' } });
// generator: yield short urls from the input array of long urls
function shorten(urls) {
    return __asyncGenerator(this, arguments, function* shorten_1() {
        const headers = { Authorization: `Bearer ${popclip.options.authsecret}` };
        for (const long_url of urls) {
            const response = yield __await(bitly.post('v4/shorten', { long_url }, { headers }));
            yield yield __await(response.data.link);
        }
    });
}
// replace all matched urls with their shortened equivalents
const action = async (input) => {
    return await (0, replace_1.replaceRangesAsync)(input.text, input.data.urls.ranges, shorten(input.data.urls));
};
exports.action = action;
// sign in to bitly using authorization flow
const auth = async (info, flow) => {
    const redirect_uri = info.redirect;
    const { code } = await flow('https://bitly.com/oauth/authorize', { client_id, redirect_uri });
    const data = util.buildQuery({ client_id, client_secret, redirect_uri, code });
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const response = await bitly.post('oauth/access_token', data, { headers });
    return response.data.access_token;
};
exports.auth = auth;
