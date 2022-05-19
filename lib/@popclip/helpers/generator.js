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
