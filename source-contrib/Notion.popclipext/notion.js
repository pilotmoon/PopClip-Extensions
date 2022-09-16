"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const access_json_1 = require("./access.json");
const axios_1 = require("axios");
// notion api root
const notion = axios_1.default.create({ baseURL: 'https://api.notion.com/v1/' });
const auth = async (info, flow) => {
    const { client_id, client_secret } = util.clarify(access_json_1.access);
    const redirect_uri = 'https://pilotmoon.com/popclip_extension_callback?callback_ext_id=com.pilotmoon.popclip.extension.notion&callback_ext_name=Notion&callback_expect=eyJxIjpbImNvZGUiXX0';
    const { code } = await flow(notion.defaults.baseURL + 'oauth/authorize', {
        client_id, redirect_uri, response_type: 'code', owner: 'user'
    });
    const response = await notion.post('oauth/token', {
        auth: { username: client_id, password: client_secret },
        body: { grant_type: 'authorization_code', code, redirect_uri }
    });
    return response.data;
};
const action = async (input, option, context) => {
    return null;
};
exports.default = { auth, action };
