"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.action = void 0;
const axios_1 = require("axios");
const hypothesis = axios_1.default.create({ baseURL: 'https://hypothes.is/api/' });
const action = async (input, options, context) => {
    const payload = {
        "group": options.group,
        "tags": [options.tag],
        "document": {
            "title": context.browserTitle,
            "link": [
                {
                    "href": context.browserUrl
                }
            ]
        },
        "target": [
            {
                "selector": [
                    {
                        "type": "TextQuoteSelector",
                        "exact": input.text
                    }
                ],
                "source": context.browserUrl
            }
        ],
        "uri": context.browserUrl,
        "user": options.user
    };
    await hypothesis.post('annotations', payload, { headers: { Authorization: `Bearer ${options.authsecret}` } });
};
exports.action = action;

const auth = async (info) => {
    const response = await hypothesis.get('profile', { headers: { Authorization: `Bearer ${info.password}` } });
    if (response.status !== 200) {
        throw new Error('Not logged in');
    }
    return info.password;
};
exports.auth = auth;
