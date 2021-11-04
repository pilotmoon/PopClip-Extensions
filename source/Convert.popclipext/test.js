"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// test program. run with `node test.js`
const testData_json_1 = require("./testData.json");
const extension = require("./convert");
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
