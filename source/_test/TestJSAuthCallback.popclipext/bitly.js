"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
// reimplementation of Bitly ext (as callback auth test)
const axios_1 = require("axios");
const client_json_1 = require("./client.json");
const { client_id, client_secret } = util.clarify(client_json_1.client);
const bitly = axios_1.default.create({ baseURL: 'https://api-ssl.bitly.com/', headers: { Accept: 'application/json' } });
// the extension object
const extension = {};
// shorten URL with bitly
extension.action = (selection, context, options) => __awaiter(void 0, void 0, void 0, function* () {
    const access_token = options.authsecret;
    const response = yield bitly.post('v4/shorten', {
        long_url: selection.data.webUrls[0]
    }, { headers: { Authorization: `Bearer ${access_token}` } });
    return response.data.link;
});
// sign in to bitly using authorization flow
extension.auth = (info, flow) => __awaiter(void 0, void 0, void 0, function* () {
    const redirect_uri = info.redirect;
    const { code } = yield flow('https://bitly.com/oauth/authorize', { client_id, redirect_uri });
    const response = yield bitly.post('oauth/access_token', util.buildQuery({
        client_id, client_secret, redirect_uri, code
    }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    return response.data.access_token;
});
module.exports = extension;
