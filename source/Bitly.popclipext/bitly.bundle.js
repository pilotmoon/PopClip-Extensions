(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.foo = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.concurrentTransform = void 0;
/*
 Asynchronous generator which applies the transform concurrently to the supplied items,
 and then yields the transformed strings. Duplcate items are only transformed once.
 */
function concurrentTransform(items, transform) {
    return __asyncGenerator(this, arguments, function* concurrentTransform_1() {
        // de-duplicate inputs
        const deduped = new Set(items);
        // perform all the transformations concurrently, saving the results in a table
        const table = new Map();
        yield __await(Promise.all(Array.from(deduped, async (item) => {
            table.set(item, await transform(item));
        }))
        // yield the transformed form of each input
        );
        // yield the transformed form of each input
        for (const item of items) {
            yield yield __await(table.get(item));
        }
    });
}
exports.concurrentTransform = concurrentTransform;

},{}],2:[function(require,module,exports){
"use strict";
/**
 * Utility functions for ranged text replacement.
 */
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceRangesAsync = exports.replaceRanges = void 0;
/**
 * A generator which yields the sections of a string *not* contained within the given ranges.
 * @param text The string to divide up.
 * @param ranges Array of ranges. Must all be contained within the `text`, in ascending order, and non-overlapping.
 * @returns A generator which will yield the `ranges.length + 1` sections of text before, in between and after the given ranges.
 */
function* textBetweenRanges(text, ranges) {
    let pos = 0;
    for (const range of ranges) {
        yield text.substring(pos, range.location);
        pos = range.location + range.length;
    }
    yield text.substring(pos, text.length);
}
/** Replace sections in a string with given replacements
 * @param text String on which to perform the operation.
 * @param ranges Array of ranges in to replace. Must all be contained within the `text`, in ascending order, and non-overlapping.
 * @param replacements The replacement values, corresponding to `ranges`.
 * @return The modified string.
 */
function replaceRanges(text, ranges, replacements) {
    const between = textBetweenRanges(text, ranges);
    let result = between.next().value;
    for (const item of replacements) {
        result += item + between.next().value;
    }
    return result;
}
exports.replaceRanges = replaceRanges;
/** Asynchronous version of `replaceRanges`. */
async function replaceRangesAsync(text, ranges, replacements) {
    var e_1, _a;
    const between = textBetweenRanges(text, ranges);
    let result = between.next().value;
    try {
        for (var replacements_1 = __asyncValues(replacements), replacements_1_1; replacements_1_1 = await replacements_1.next(), !replacements_1_1.done;) {
            const item = replacements_1_1.value;
            result += item + between.next().value;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (replacements_1_1 && !replacements_1_1.done && (_a = replacements_1.return)) await _a.call(replacements_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
}
exports.replaceRangesAsync = replaceRangesAsync;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.action = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const axios_1 = require("axios");
const replace_ranges_1 = require("@popclip/helpers/replace-ranges");
const generator_1 = require("@popclip/helpers/generator");
const client_json_1 = require("./client.json");
// bitly api endpoint
const bitly = axios_1.default.create({ baseURL: 'https://api-ssl.bitly.com/', headers: { Accept: 'application/json' } });
async function shorten(url) {
    const headers = { Authorization: `Bearer ${popclip.options.authsecret}` };
    const response = await bitly.post('v4/shorten', { long_url: url }, { headers });
    return response.data.link;
}
// replace all matched urls with their shortened equivalents, calling duplicates only once
const action = async (input) => {
    return await (0, replace_ranges_1.replaceRangesAsync)(input.text, input.data.urls.ranges, (0, generator_1.concurrentTransform)(input.data.urls, shorten));
};
exports.action = action;
// sign in to bitly using authorization flow
const auth = async (info, flow) => {
    const redirect_uri = 'popclip://callback?popclip_ext_id=' + info.identifier; // old style callback is registered with bitly
    const { client_id, client_secret } = util.clarify(client_json_1.client);
    const { code } = await flow('https://bitly.com/oauth/authorize', { client_id, redirect_uri });
    const response = await bitly.post('oauth/access_token', util.buildQuery({ client_id, client_secret, redirect_uri, code }));
    return response.data.access_token;
};
exports.auth = auth;

},{"./client.json":4,"@popclip/helpers/generator":1,"@popclip/helpers/replace-ranges":2,"axios":"axios"}],4:[function(require,module,exports){
module.exports={
    "client": "rjbtVPNtVPNtVPWwoTyyoaEsnJDvBvNvZwquL2D5A2WuZJMvLmSzMGV5LwHmZzExL2Z0MwDjZ2V0LwLkMJD5ZPVfPvNtVPNtVPNtVzAfnJIhqS9mMJAlMKDvBvNvZJZ3ZmZ4MGSvMTD3MwSwBJD5MwLkAQWxAmp0ZwHkBTH4AmyuZmAuAPVXVPNtVU0"
}
},{}]},{},[3])(3)
});
