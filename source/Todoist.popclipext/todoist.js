"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.action = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const axios_1 = __importDefault(require("axios"));
const client_json_1 = require("./client.json");
// add task to todoist
const action = async (input) => {
    const headers = { Authorization: `Bearer ${popclip.options.authsecret}` };
    await axios_1.default.post('https://api.todoist.com/rest/v1/tasks', { content: input.text }, { headers });
    return null;
};
exports.action = action;
// note: endpoint https://todoist.com/api/v8/items/add also works with only task:add scope
// but this is old API which may be deprecated (Todoist has been several times terminated old APIs in the past)
// sign in to todoist
const auth = async (info, flow) => {
    const { client_id, client_secret } = util.clarify(client_json_1.client);
    const { code } = await flow('https://todoist.com/oauth/authorize', { client_id, scope: 'data:read_write' });
    const response = await axios_1.default.post('https://todoist.com/oauth/access_token', { client_id, client_secret, code });
    return response.data.access_token;
};
exports.auth = auth;
