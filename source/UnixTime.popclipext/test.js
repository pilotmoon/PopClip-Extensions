// run with `/Applications/PopClip.app/Contents/MacOS/PopClip runjs test.js`
// (PopClip Build 28444 and above)
const { test } = require("./unixtime")

const testData = new Map([	
	[["1535438729", 'UTC', 'zu', false] , "2018-08-28 06:45:29 UTC"],
	[["1535438729", 'Europe/London', 'gb', false] , "28/08/2018, 07:45:29 BST"],
	[["1535438729", 'America/New_York', 'zu', false] , "2018-08-28 02:45:29 GMT-4"],
	[["1535438729", 'Pacific/Honolulu', 'zu', false] , "2018-08-27 20:45:29 GMT-10"],
	[["2147483647", "UTC", "zu", false], "2038-01-19 03:14:07 UTC"],
	[["4294967295", "UTC", "zu", false], "2106-02-07 06:28:15 UTC"],
	[["2147483647000", "UTC", "zu", false], "+070021-01-17 19:16:40 UTC"],
	[["4294967295000", "UTC", "zu", false], "+138072-02-04 14:50:00 UTC"],
	[["2147483647000", "UTC", "zu", true], "2038-01-19 03:14:07 UTC"],
	[["4294967295000", "UTC", "zu", true], "2106-02-07 06:28:15 UTC"],
]);

let fail = false;

testData.forEach((expect, testValue) => {
	const result = test(testValue[0], {timeZone: testValue[1], locale:testValue[2], handleMilliseconds:testValue[3]});
	const pass = result === expect;
	if (!pass) {
		fail = true;
	}
	print(`${testValue} -> ${result} ${pass ? `OK` : `FAIL`}`)
})

print(`${fail ? `FAILED` : `PASSED`}`);
