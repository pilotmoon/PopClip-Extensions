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
exports.options = exports.auth = exports.action = void 0;
// reimplementation of Pinboard ext (as basic test)
// docs: https://pinboard.in/api/
//       https://axios-http.com/docs/req_config
const axios_1 = require("axios");
const pinboard = axios_1.default.create({ baseURL: 'https://api.pinboard.in/v1/', params: { format: 'json' } });
// add url to pinboard
// uses page title as description if page url matches selected url
const action = (selection, context, options) => __awaiter(void 0, void 0, void 0, function* () {
    const url = selection.data.webUrls[0];
    const description = context.browserUrl === url ? context.browserTitle : '';
    const token = `${options.username}:${options.authsecret}`;
    yield pinboard.get('posts/add', { params: { url, description, auth_token: token } });
    popclip.showSuccess();
});
exports.action = action;
// retreive user's api token using basic http authentication
const auth = (info) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield pinboard.get('user/api_token', { auth: info });
    return response.data.result;
});
exports.auth = auth;
// options
exports.options = [
    { identifier: 'username', type: 'string', label: util.localize('Username') },
    { identifier: 'password', type: 'password', label: util.localize('Password') }
];
