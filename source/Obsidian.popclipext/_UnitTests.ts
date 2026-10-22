import { buildContent, buildUri, type Options } from "./Config";

// Unit tests for the pure helpers in Config.ts. Run with:
//   /Applications/PopClip.app/Contents/MacOS/PopClip run _UnitTests.ts test
// The leading underscore keeps this file out of the packaged extension.
export function test() {
  let passed = 0;
  let failed = 0;

  function assertEqual(actual: string, expected: string, testName: string) {
    if (actual === expected) {
      passed++;
      print(`✓ ${testName}`);
    } else {
      failed++;
      print(`✗ ${testName}`);
      print(`  Expected: ${expected}`);
      print(`  Actual:   ${actual}`);
    }
  }

  const baseOptions: Options = {
    vaultName: "Dry, Dark Place",
    fileName: "",
    heading: "",
    newFile: false,
    sourceLink: true,
    includeTimestamp: false,
  };

  const sourceUrl = "https://www.lipsum.com/";
  const sourceTitle = "Lorem Ipsum - All the facts - Lipsum generator";
  const content = "Lorem Ipsum has been the industry's standard dummy";
  const testDate = new Date("2024-01-15T14:30:00");
  const link = `[${sourceTitle}](${sourceUrl})`;

  // Test 1: clippings file, no heading
  assertEqual(
    buildUri(content, { ...baseOptions, fileName: "Clippings" }, sourceUrl, sourceTitle),
    `obsidian://advanced-uri?vault=Dry%2C%20Dark%20Place&filename=Clippings&data=%0ALorem%20Ipsum%20has%20been%20the%20industry%27s%20standard%20dummy%0A%5BLorem%20Ipsum%20-%20All%20the%20facts%20-%20Lipsum%20generator%5D%28https%3A%2F%2Fwww.lipsum.com%2F%29&mode=append`,
    "Test 1: clippings file, no heading"
  );

  // Test 2: clippings file, no heading, new file
  assertEqual(
    buildUri(content, { ...baseOptions, fileName: "Clippings", newFile: true }, sourceUrl, sourceTitle),
    `obsidian://advanced-uri?vault=Dry%2C%20Dark%20Place&filename=Clippings&data=Lorem%20Ipsum%20has%20been%20the%20industry%27s%20standard%20dummy%0A%5BLorem%20Ipsum%20-%20All%20the%20facts%20-%20Lipsum%20generator%5D%28https%3A%2F%2Fwww.lipsum.com%2F%29&mode=new`,
    "Test 2: clippings file, no heading, new file"
  );

  // Test 3: clippings file, with heading
  assertEqual(
    buildUri(content, { ...baseOptions, fileName: "Clippings", heading: "My Heading" }, sourceUrl, sourceTitle),
    `obsidian://advanced-uri?vault=Dry%2C%20Dark%20Place&filename=Clippings&heading=My%20Heading&data=%0ALorem%20Ipsum%20has%20been%20the%20industry%27s%20standard%20dummy%0A%5BLorem%20Ipsum%20-%20All%20the%20facts%20-%20Lipsum%20generator%5D%28https%3A%2F%2Fwww.lipsum.com%2F%29&mode=append`,
    "Test 3: clippings file, with heading"
  );

  // Test 4: daily note file, no heading
  assertEqual(
    buildUri(content, baseOptions, sourceUrl, sourceTitle),
    `obsidian://advanced-uri?vault=Dry%2C%20Dark%20Place&daily=true&data=%0ALorem%20Ipsum%20has%20been%20the%20industry%27s%20standard%20dummy%0A%5BLorem%20Ipsum%20-%20All%20the%20facts%20-%20Lipsum%20generator%5D%28https%3A%2F%2Fwww.lipsum.com%2F%29&mode=append`,
    "Test 4: daily note file, no heading"
  );

  // Test 5: daily note file, with heading
  assertEqual(
    buildUri(content, { ...baseOptions, heading: "My Heading" }, sourceUrl, sourceTitle),
    `obsidian://advanced-uri?vault=Dry%2C%20Dark%20Place&daily=true&heading=My%20Heading&data=%0ALorem%20Ipsum%20has%20been%20the%20industry%27s%20standard%20dummy%0A%5BLorem%20Ipsum%20-%20All%20the%20facts%20-%20Lipsum%20generator%5D%28https%3A%2F%2Fwww.lipsum.com%2F%29&mode=append`,
    "Test 5: daily note file, with heading"
  );

  // Test 6: sourceLink: false should omit link
  assertEqual(
    buildContent(content, { ...baseOptions, sourceLink: false }, sourceUrl, sourceTitle),
    `\n${content}`,
    "Test 6: sourceLink: false should omit link"
  );

  // Test 7: No link provided should return content
  assertEqual(
    buildContent(content, baseOptions),
    `\n${content}`,
    "Test 7: No link provided should return content"
  );

  // Test 8: When the selection is just the page URL, return only the markdown link
  assertEqual(
    buildContent(sourceUrl, baseOptions, sourceUrl, sourceTitle, undefined, sourceUrl),
    `\n${link}`,
    "Test 8: When content contains only the URL, return markdown link"
  );

  // Test 9: Timestamp is included
  assertEqual(
    buildContent(content, { ...baseOptions, includeTimestamp: true }, sourceUrl, sourceTitle, testDate),
    `\n- 14:30 ${content}\n${link}`,
    "Test 9: Timestamp is shown"
  );

  // Test 10: Timestamp is included when only the markdown link is returned
  assertEqual(
    buildContent(sourceUrl, { ...baseOptions, includeTimestamp: true }, sourceUrl, sourceTitle, testDate, sourceUrl),
    `\n- 14:30 ${link}`,
    "Test 10: Timestamp is included when only the markdown link is returned"
  );

  // Test 11: Trailing slash should not prevent URL matching.
  // Safari reports the page URL with a trailing slash, but the selected text on
  // this site lacks it. Both normalize to the same URL.
  assertEqual(
    buildContent("https://wasp.sh", baseOptions, "https://wasp.sh/", "Wasp", undefined, "https://wasp.sh"),
    `\n[Wasp](https://wasp.sh/)`,
    "Test 11: Trailing slash should not prevent URL matching"
  );

  // Test 12: A selected URL that differs from the page URL keeps both
  const otherUrl = "https://example.com/other";
  assertEqual(
    buildContent(otherUrl, baseOptions, sourceUrl, sourceTitle, undefined, otherUrl),
    `\n${otherUrl}\n${link}`,
    "Test 12: Different selected URL keeps text and link"
  );

  // Test 13: Text equal to the page URL but not detected as a URL by PopClip keeps both
  assertEqual(
    buildContent(sourceUrl, baseOptions, sourceUrl, sourceTitle),
    `\n${sourceUrl}\n${link}`,
    "Test 13: No detected URL falls back to text and link"
  );

  print(`\n${passed} passed, ${failed} failed`);
  if (failed > 0) {
    throw new Error(`${failed} test(s) failed`);
  }
}
