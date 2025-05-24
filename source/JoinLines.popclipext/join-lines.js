"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.action = exports.regex = void 0;
exports.regex = /\n|\r/;
const action = input => joinLines(input.text);
exports.action = action;
// split input into lines, trim them, discard blank lines, and join with space
function joinLines(text) {
    return text.split(exports.regex).map(str => str.trim()).filter(str => str.length > 0).join(' ');
}
// test function
function test() {
    const testData = [
        ['one\ntwo', 'one two'],
        ['one\r\ntwo', 'one two'],
        ['one\rtwo', 'one two'],
        ['one\n\rtwo', 'one two'],
        ['  one', 'one'],
        ['', ''],
        ['\n', ''],
        ['one\n \ttwo\nthree', 'one two three'],
        ['one\ntwo\n\nthree', 'one two three']
    ];
    let pass = 0;
    let fail = 0;
    for (const [input, expect] of testData) {
        const result = joinLines(input);
        print(`* "${input}" → "${result}"`);
        if (result === expect) {
            pass++;
            print('OK');
        }
        else {
            fail++;
            print(`FAIL, expected: "${expect}"`);
        }
    }
    print(`${pass} tests passed, ${fail} tests failed`);
    if (fail > 0) {
        throw new Error('test failed');
    }
}
exports.test = test;
