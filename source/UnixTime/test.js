// run with `/Applications/PopClip.app/Contents/MacOS/PopClip runjs test.js`
// (PopClip Build 28444 and above)
const { test } = require("./unixtime")

const testData = new Map([	
	[["1535438729", 'UTC', 'zu'] , "2018-08-28 06:45:29 UTC"],
	[["1535438729", '', 'gb'] , "28/08/2018, 07:45:29 BST"],
]);

let fail = false;

testData.forEach((expect, testValue) => {
	const result = test(testValue[0], {timeZone: testValue[1], locale:testValue[2]});
	const pass = result === expect;
	if (!pass) {
		fail = true;
	}
	print(`${testValue} -> ${result} ${pass ? `OK` : `FAIL`}`)
})

print(`${fail ? `FAILED` : `PASSED`}`);