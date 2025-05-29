/* Test program. Run with this command line:

    /Applications/PopClip.app/Contents/MacOS/PopClip run test.ts

*/

import { testData } from "./testData.json";
import * as extension from "./convert.ts";

if (typeof print === "undefined") {
  globalThis.print = console.log;
}

// simulate using the extension; assume single action returned
function simulate(testString: string): unknown {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const x = extension.actions(
    { text: testString } as Input,
    {} as Options,
    {} as Context,
  );
  if (typeof x === "function") {
    // got single action as expected
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return x({ text: testString } as Input, { authsecret: "" }, {} as Context);
  }
  return null;
}

function test(): void {
  let numFailures = 0;
  let numPasses = 0;

  for (const [inputString, expectedOutput] of testData) {
    if (typeof inputString !== "string") {
      print(`bad input: ${JSON.stringify(inputString)}`);
      numFailures += 1;
      continue;
    }

    const output = simulate(inputString);
    // print('output', output, 'expected', expectedOutput)
    if (output === null) {
      if (output === expectedOutput) {
        print(`PASS: '${inputString}' -> 'null'`);
        numPasses += 1;
      } else {
        print(
          `FAIL: '${inputString}' -> 'null' (expected: '${expectedOutput}')`,
        );
        numFailures += 1;
      }
    } else if (typeof output === "string") {
      if (output === expectedOutput) {
        print(`PASS: '${inputString}' -> '${output}'`);
        numPasses += 1;
      } else {
        print(
          `FAIL: '${inputString}' -> '${output}' (expected: '${expectedOutput ?? "null"}')`,
        );
        numFailures += 1;
      }
    } else {
      print(`bad output: ${JSON.stringify(output)}`);
      numFailures += 1;
    }
  }

  if (numFailures > 0) {
    print(`${numPasses} test(s) passed`);
    print(`${numFailures} test(s) failed`);
  } else {
    print("All tests passed");
  }
}

test();
