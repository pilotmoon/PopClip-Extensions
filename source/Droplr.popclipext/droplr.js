"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.auth = exports.action = void 0;
const axios_1 = __importDefault(require("axios"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const replace_ranges_1 = require("@popclip/helpers/replace-ranges");
const generator_1 = require("@popclip/helpers/generator");
const access_json_1 = require("./access.json");
const droplr = axios_1.default.create({
    baseURL: 'https://api.droplr.com',
    headers: { 'User-Agent': 'com.pilotmoon.popclip.extension.droplr/2' }
});
/*
Droplr has its own custom authentication formula.
http://droplr.github.io/docs/#authentication-formula
*/
async function droplrRequest(action, method, passwordHash, userEmail, contentType = '', data = '') {
    const { puk, prk } = util.clarify(access_json_1.access);
    const epochMilliseconds = new Date().getTime();
    const pub = util.base64Encode(`${puk}:${userEmail}`);
    const sig = crypto_js_1.default.HmacSHA1(`${method} ${action} HTTP/1.1\n${contentType}\n${epochMilliseconds}`, `${prk}:${passwordHash}`).toString(crypto_js_1.default.enc.Base64);
    const response = await droplr({
        method: method,
        url: action,
        data: data,
        headers: {
            Authorization: `droplr ${pub}:${sig}`,
            'Content-Type': contentType,
            Date: epochMilliseconds
        }
    });
    return response.data;
}
async function shorten(url) {
    const { passwordHash, userEmail } = JSON.parse(popclip.options.authsecret);
    return await droplrRequest('/links', 'POST', passwordHash, userEmail, 'text/plain', url);
}
// replace all matched urls with their shortened equivalents, calling duplicates only once
const action = async (input) => {
    return await (0, replace_ranges_1.replaceRangesAsync)(input.text, input.data.urls.ranges, (0, generator_1.concurrentTransform)(input.data.urls, shorten));
};
exports.action = action;
const auth = async (info) => {
    const passwordHash = crypto_js_1.default.SHA1(info.password).toString(crypto_js_1.default.enc.Hex);
    const userEmail = info.username;
    // retrieve the 'account' endpoint to prove we can login
    await droplrRequest('/account', 'GET', passwordHash, userEmail, '');
    // these are the value we need later
    return JSON.stringify({ passwordHash, userEmail });
};
exports.auth = auth;
// options
exports.options = [
    { identifier: 'username', type: 'string', label: util.localize('Username') },
    { identifier: 'password', type: 'password', label: util.localize('Password') }
];
