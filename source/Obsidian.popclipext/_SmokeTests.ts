import { capture } from "./Config";

// Live smoke test: sends real captures to an Obsidian vault named "Dry, Dark Place". Run with:
//   /Applications/PopClip.app/Contents/MacOS/PopClip run _SmokeTests.ts test
// The leading underscore keeps this file out of the packaged extension.
// For the unit tests of the pure helpers, see _UnitTests.ts.
export async function test() {
  capture("in clippings file, no heading", {
    vaultName: "Dry, Dark Place",
    fileName: "Clippings",
    heading: "",
    newFile: false,
    sourceLink: true,
    includeTimestamp: true,
  });
  await sleep(100);
  capture("in clippings file, no heading, new file", {
    vaultName: "Dry, Dark Place",
    fileName: "Clippings",
    heading: "",
    newFile: true,
    sourceLink: true,
    includeTimestamp: true,
  });
  await sleep(100);
  capture("in clippings file, with heading", {
    vaultName: "Dry, Dark Place",
    fileName: "Clippings",
    heading: "My Heading",
    newFile: false,
    sourceLink: true,
    includeTimestamp: true,
  });
  await sleep(100);
  capture("in daily note file, no heading", {
    vaultName: "Dry, Dark Place",
    fileName: "",
    newFile: false,
    heading: "",
    sourceLink: true,
    includeTimestamp: true,
  });
  await sleep(100);
  capture("in daily note file, with heading", {
    vaultName: "Dry, Dark Place",
    newFile: false,
    fileName: "",
    heading: "My Heading",
    sourceLink: true,
    includeTimestamp: true,
  });
}
