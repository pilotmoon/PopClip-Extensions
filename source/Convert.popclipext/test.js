"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// test program. run with `node test.js`
const testData_json_1 = require("./testData.json");
const extension = __importStar(require("./convert"));
if (typeof print === 'undefined') {
    globalThis.print = console.log;
}
// simulate using the extension; assume single action returned
function simulate(testString) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const x = extension.actions({ text: testString }, {}, {});
    if (typeof x === 'function') { // got single action as expected
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return x({ text: testString }, {}, {});
    }
    else {
        return null;
    }
}
function test() {
    let numFailures = 0;
    let numPasses = 0;
    for (const [inputString, expectedOutput] of testData_json_1.testData) {
        if (typeof inputString !== 'string') {
            print('bad input: ' + JSON.stringify(inputString));
            numFailures += 1;
            continue;
        }
        const output = simulate(inputString);
        // print('output', output, 'expected', expectedOutput)
        if (output === null) {
            if (output === expectedOutput) {
                print(`PASS: '${inputString}' -> 'null'`);
                numPasses += 1;
            }
            else {
                print(`FAIL: '${inputString}' -> 'null' (expected: '${expectedOutput}')`);
                numFailures += 1;
            }
        }
        else if (typeof output === 'string') {
            if (output === expectedOutput) {
                print(`PASS: '${inputString}' -> '${output}'`);
                numPasses += 1;
            }
            else {
                print(`FAIL: '${inputString}' -> '${output}' (expected: '${expectedOutput !== null && expectedOutput !== void 0 ? expectedOutput : 'null'}')`);
                numFailures += 1;
            }
        }
        else {
            print('bad output: ' + JSON.stringify(output));
            numFailures += 1;
        }
    }
    if (numFailures > 0) {
        print(`${numPasses} test(s) passed`);
        print(`${numFailures} test(s) failed`);
        process.exit(1);
    }
    else {
        print('All tests passed');
    }
}
test();
