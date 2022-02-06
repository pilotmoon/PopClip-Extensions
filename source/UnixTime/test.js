const { test } = require("./Config")

const testData = new Map([
	["1535438729", "2018-08-28 06:45:29 UTC"]
]);

let fail = false;

testData.forEach((expect, testValue) => {
	const result = test(testValue);
	const pass = result === expect;
	if (!pass) {
		fail = true;
	}
	console.log(`${testValue} -> ${result} ${pass ? `OK` : `FAIL`}`)
})

console.log(`${fail ? `FAILED` : `PASSED`}`);