"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
const tests = [];
/**
 * Declare a test to be run.
 * @param description Description of this test
 * @param func The function to perform the tests. It should exit normally to indicate success, or throw if any test fails.
 */
function test(description, func) {
    tests.push(func);
}
exports.test = test;
test.run = function () {
    for (const func of tests) {
        func();
    }
};
