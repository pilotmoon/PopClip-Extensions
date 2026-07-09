import { buildContent, buildUri, } from "./Config";

// Note: Run these tests with: `npx tsx UnitTests.ts`

let passed = 0;
let failed = 0;

function assertEqual(actual: string, expected: string, testName: string) {
  if (actual === expected) {
    passed++;
    console.log(`✓ ${testName}`);
  } else {
    failed++
    console.log(`✗ ${testName}`);
    console.log(`  Expected: ${expected}`);
    console.log(`  Actual:   ${actual}`);
  }
}

const baseOptions = {
  vaultName: "Dry, Dark Place",
  fileName: "",
  heading: "",
  newFile: false,
  sourceLink: true,
  includeTimestamp: false,
};

const sourceUrl = "https://www.lipsum.com/";
const sourceTitle = "Lorem Ipsum - All the facts - Lipsum generator";
const content = "Lorem Ipsum has been the industry's standard dummy"
const testDate = new Date("2024-01-15T14:30:00");

let testUrl: URL;
let expectedUrl: string;
let testContent: string;
let expectedContent: string;

// Test 1: clippings file, no heading
testUrl = buildUri(content, { ...baseOptions, fileName: "Clippings", }, sourceUrl, sourceTitle);
expectedUrl = `obsidian://advanced-uri?vault=Dry%2C+Dark+Place&filename=Clippings&data=%0ALorem+Ipsum+has+been+the+industry%27s+standard+dummy%0A%5BLorem+Ipsum+-+All+the+facts+-+Lipsum+generator%5D%28https%3A%2F%2Fwww.lipsum.com%2F%29&mode=append`;

assertEqual(testUrl.toString(), expectedUrl.toString(), "Test 1: clippings file, no heading");

// Test 2: clippings file, no heading, new file
testUrl = buildUri(content, { ...baseOptions, fileName: "Clippings", newFile: true, }, sourceUrl, sourceTitle);
expectedUrl = `obsidian://advanced-uri?vault=Dry%2C+Dark+Place&filename=Clippings&data=Lorem+Ipsum+has+been+the+industry%27s+standard+dummy%0A%5BLorem+Ipsum+-+All+the+facts+-+Lipsum+generator%5D%28https%3A%2F%2Fwww.lipsum.com%2F%29&mode=new`;

assertEqual(testUrl.toString(), expectedUrl.toString(), "Test 2: clippings file, no heading, new file",);

// Test 3: clippings file, with heading
testUrl = buildUri(content, { ...baseOptions, fileName: "Clippings", heading: "My Heading", }, sourceUrl, sourceTitle);
expectedUrl = `obsidian://advanced-uri?vault=Dry%2C+Dark+Place&filename=Clippings&heading=My+Heading&data=%0ALorem+Ipsum+has+been+the+industry%27s+standard+dummy%0A%5BLorem+Ipsum+-+All+the+facts+-+Lipsum+generator%5D%28https%3A%2F%2Fwww.lipsum.com%2F%29&mode=append`;

assertEqual(testUrl.toString(), expectedUrl.toString(), "Test 3: clippings file, with heading",);

// Test 4: daily note file, no heading
testUrl = buildUri(content, { ...baseOptions, }, sourceUrl, sourceTitle);
expectedUrl = `obsidian://advanced-uri?vault=Dry%2C+Dark+Place&daily=true&data=%0ALorem+Ipsum+has+been+the+industry%27s+standard+dummy%0A%5BLorem+Ipsum+-+All+the+facts+-+Lipsum+generator%5D%28https%3A%2F%2Fwww.lipsum.com%2F%29&mode=append`;

assertEqual(testUrl.toString(), expectedUrl.toString(), "Test 4: daily note file, no heading",);

// Test 5: daily note file, with heading
testUrl = buildUri(content, { ...baseOptions, heading: "My Heading", }, sourceUrl, sourceTitle);
expectedUrl = `obsidian://advanced-uri?vault=Dry%2C+Dark+Place&daily=true&heading=My+Heading&data=%0ALorem+Ipsum+has+been+the+industry%27s+standard+dummy%0A%5BLorem+Ipsum+-+All+the+facts+-+Lipsum+generator%5D%28https%3A%2F%2Fwww.lipsum.com%2F%29&mode=append`

assertEqual(testUrl.toString(), expectedUrl.toString(), "Test 5: daily note file, with heading",);

// Test 6: sourceLink: false should omit link, return content
testContent = buildContent(content, { ...baseOptions, sourceLink: false }, sourceUrl, sourceTitle);
expectedContent = `\n${content}`;

assertEqual(testContent, expectedContent, "Test 6: sourceLink: false should omit link");

// Test 7: No link provided should return content
testContent = buildContent(content, { ...baseOptions, });
expectedContent = `\n${content}`;

assertEqual(testContent, expectedContent, "Test 7: No link provided should return content");

// Test 8: When content contains only URL, return markdown link
testContent = buildContent(sourceUrl, { ...baseOptions, }, sourceUrl, sourceTitle);
expectedContent = `\n[Lorem Ipsum - All the facts - Lipsum generator](https://www.lipsum.com/)`;

assertEqual(testContent, expectedContent, "Test 8: When content contains only the URL, return markdown link");

// Test 9: Timestamp is included
testContent = buildContent(content, { ...baseOptions, includeTimestamp: true }, sourceUrl, sourceTitle, testDate);
expectedContent = `\n- 14:30 Lorem Ipsum has been the industry's standard dummy
[Lorem Ipsum - All the facts - Lipsum generator](https://www.lipsum.com/)`;

assertEqual(testContent, expectedContent, "Test 9: Timestamp is shown");

// Test 10: Timestamp is included when only the markdown link is returned
testContent = buildContent(sourceUrl, { ...baseOptions, includeTimestamp: true }, sourceUrl, sourceTitle, testDate);
expectedContent = `\n- 14:30 [Lorem Ipsum - All the facts - Lipsum generator](https://www.lipsum.com/)`;

assertEqual(testContent, expectedContent, "Test 10: Timestamp is included when only the markdown link is returned");

// Test 11: Trailing slash should not prevent URL matching
// Set up the site that caused the issue
const test11Url = `https://wasp.sh/`;
const test11Title = `Wasp`;
const test11Markdown = test11Url.replace(/\/$/, ''); // The trailing slash gets stripped from the popclip content for this site for some reason.

testContent = buildContent(test11Markdown, { ...baseOptions, }, test11Url, test11Title);
expectedContent = `\n[Wasp](https://wasp.sh/)`;

assertEqual(testContent, expectedContent, "Test 11: Trailing slash should not prevent URL matching");


// Test run results
console.log(`\n${passed} passed, ${failed} failed`);
