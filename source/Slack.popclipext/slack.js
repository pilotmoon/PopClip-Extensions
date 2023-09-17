"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const access_json_1 = require("./access.json");
const zod_1 = require("zod");
const axios_1 = require("axios");
// slack api base
const slack = axios_1.default.create({ baseURL: 'https://slack.com/api/' });
// the expected api response
const AccessResponse = zod_1.z.object({
    access_token: zod_1.z.string().min(1),
    incoming_webhook: zod_1.z.object({
        url: zod_1.z.string().min(1)
    })
});
const auth = async (info, flow) => {
    const { client_id, client_secret } = util.clarify(access_json_1.access);
    const authorizationUrl = 'https://slack.com/oauth/v2/authorize';
    const { code } = await flow(authorizationUrl, { client_id, scope: 'incoming-webhook' });
    const response = await slack.post('oauth.v2.access', util.buildQuery({ code, client_id, client_secret }));
    return JSON.stringify(AccessResponse.parse(response.data));
};
const action = async (input, options, context) => {
    const url = AccessResponse.parse(JSON.parse(options.authsecret)).incoming_webhook.url;
    const text = slack_escape(popclip.input.text);
    await slack.post(url, { text });
};
// https://api.slack.com/reference/surfaces/formatting#basics
// escaping as required by slack api
function slack_escape(str) {
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    return str;
}
exports.default = { action, auth };
