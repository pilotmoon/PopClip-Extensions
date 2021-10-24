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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.action = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
// reimplementation of Bitly ext (as callback auth test)
var axios_1 = require("axios");
var client_json_1 = require("./client.json");
var bitly = axios_1.default.create({ baseURL: 'https://api-ssl.bitly.com/', headers: { Accept: 'application/json' } });
// shorten URL with bitly
var action = function (selection, context, options) { return __awaiter(void 0, void 0, void 0, function () {
    var access_token, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                access_token = options.authsecret;
                return [4 /*yield*/, bitly.post('v4/shorten', {
                        long_url: selection.data.webUrls[0]
                    }, { headers: { Authorization: "Bearer " + access_token } })];
            case 1:
                response = _a.sent();
                popclip.pasteText(response.data.link);
                popclip.showSuccess();
                return [2 /*return*/];
        }
    });
}); };
exports.action = action;
// sign in using authorization flow
var auth = function (info, flow) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, client_id, client_secret, redirect_uri, code, response;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = JSON.parse(util.base64Decode(client_json_1.client)), client_id = _a.client_id, client_secret = _a.client_secret;
                redirect_uri = util.authRedirectUrl(['code']);
                return [4 /*yield*/, flow('https://bitly.com/oauth/authorize', { client_id: client_id, redirect_uri: redirect_uri })];
            case 1:
                code = (_b.sent()).code;
                return [4 /*yield*/, bitly.post('oauth/access_token', util.buildQuery({
                        client_id: client_id,
                        client_secret: client_secret,
                        redirect_uri: redirect_uri,
                        code: code
                    }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })];
            case 2:
                response = _b.sent();
                return [2 /*return*/, response.data.access_token];
        }
    });
}); };
exports.auth = auth;
