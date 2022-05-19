"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = void 0;
const axios_1 = require("@popclip/axios");
const replace_ranges_1 = require("@popclip/helpers/replace-ranges");
const generator_1 = require("@popclip/helpers/generator");
const action = async (input, options) => {
    async function shorten(url) {
        const endpoint = `https://${options.domain}/create.php?format=json&url=${encodeURIComponent(url)}`;
        const response = await axios_1.default.get(endpoint);
        if (typeof response.data.shorturl === 'string') {
            return response.data.shorturl;
        }
        else {
            throw new Error('no link');
        }
    }
    return await (0, replace_ranges_1.replaceRangesAsync)(input.text, input.data.urls.ranges, (0, generator_1.concurrentTransform)(input.data.urls, shorten));
};
exports.action = action;
