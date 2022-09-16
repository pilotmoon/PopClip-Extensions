"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = exports.auth = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const client_json_1 = require("./client.json");
const axios_1 = require("axios");
const login_uri = 'https://login.microsoftonline.com/common/oauth2/v2.0';
const oauth_endpoint = axios_1.default.create({ baseURL: login_uri });
const scope = 'Notes.Create offline_access';
const auth = async (info, flow) => {
    // get authorization code
    const redirect_uri = info.redirect;
    const { code } = await flow(login_uri + '/authorize', { client_id: client_json_1.client_id, redirect_uri, scope, response_mode: 'query', response_type: 'code' });
    // get refresh token
    const response = await oauth_endpoint.post('token', util.buildQuery({ client_id: client_json_1.client_id, redirect_uri, scope, code, grant_type: 'authorization_code' }));
    return response.data.refresh_token;
};
exports.auth = auth;
const refresh_access = async (refresh_token) => {
    print('refreshing access token');
    const response = await oauth_endpoint.post('token', util.buildQuery({ client_id: client_json_1.client_id, refresh_token, grant_type: 'refresh_token' }));
    return response.data.access_token;
};
// actually post the content
const action = async (input, options, context) => {
    const access_token = await refresh_access(options.authsecret);
    print('got access token', access_token);
    const onenote_endpoint = axios_1.default.create({
        baseURL: 'https://graph.microsoft.com/v1.0/me/onenote',
        headers: { Authorization: `Bearer ${access_token}` }
    });
    let content = input.html;
    if (context.browserUrl.length > 0 && context.browserTitle.length > 0) {
        content = content + `<p>Clipped from: <a href="${context.browserUrl}">${context.browserTitle}</a></p>`;
    }
    await onenote_endpoint.post('pages', content, { headers: { 'Content-Type': 'text/html' } });
    return null;
};
exports.action = action;
