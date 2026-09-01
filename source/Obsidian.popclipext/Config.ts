// #popclip
// name: Obsidian
// identifier: com.pilotmoon.popclip.extension.obsidian
// description: Capture text to Obsidian.
// popclip version: 4688
// app: { name: Obsidian, link: https://obsidian.md/ }
// icon: iconify:simple-icons:obsidian

export const options = [
  {
    identifier: "info",
    type: "heading",
    label: "Important!",
    description:
      "See the extension's README about required preparation steps in Obsidian.",
  },
  {
    identifier: "vaultName",
    label: "Vault Name (required)",
    type: "string",
    description: "Name of the vault in Obsidian.",
  },
  {
    identifier: "fileName",
    label: "File Name",
    type: "string",
    description: "Optional destination file. Leave blank to use Daily Note.",
  },
  {
    identifier: "newFile",
    label: "Always create new file",
    type: "boolean",
    defaultValue: false,
    description:
      "Add each capture to its own file, appending an incrementing number to the file name.",
  },
  {
    identifier: "heading",
    label: "Heading",
    type: "string",
    description:
      "Optional heading to insert captures under. Leave blank to append at the bottom of the file.",
  },
  {
    identifier: "captureOptionsHeading",
    type: "heading",
    label: "Capture Options",
  },
  {
    identifier: "sourceLink",
    type: "boolean",
    label: "Include source link",
  },
  {
    identifier: "includeTimestamp",
    type: "boolean",
    label: "Include timestamp",
    defaultValue: false,
    description:
      "Add the current time as a prefix to the capture, e.g. '- 17:58 '.",
  },
] as const;

type Options = InferOptions<typeof options>;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Add markdown link builder (allows testing)
function buildMarkdownLink(url: string, title?: string): string {
  return `[${title || "Source"}](${url})`;
}

export function buildContent(
  markdown: string,
  options: Options,
  url?: string,
  title?: string,
  now: Date = new Date()
): string {
  let result = "";

  if (options.sourceLink && url) {
    // Trailing slash should not prevent URL matching
    if (markdown.replace(/\/$/, '') === url.replace(/\/$/, '')) {
      result += buildMarkdownLink(url, title);
    } else {
      result += markdown + `\n` + buildMarkdownLink(url, title);
    }
  } else {
    result += markdown;
  }

  if (options.includeTimestamp) {
    const timestamp = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    result = `- ${timestamp} ${result}`;
  }

  if (!options.newFile) {
    result = `\n${result}`;
  }

  return result;
}

export function buildUri(markdown: string, options: Options, url?: string, title?: string): URL {
  const content = buildContent(markdown, options, url, title);

  const result = new URL("obsidian://advanced-uri");
  result.searchParams.append("vault", options.vaultName);
  if (options.fileName) {
    result.searchParams.append("filename", options.fileName);
  } else {
    result.searchParams.append("daily", "true");
  }
  if (options.heading) {
    result.searchParams.append("heading", options.heading);
  }
  result.searchParams.append("data", content);
  result.searchParams.append("mode", options.newFile ? "new" : "append");

  return result;
}

function capture(markdown: string, options: Options, url?: string, title?: string) {
  const obsidianUri = buildUri(markdown, options, url, title);
  popclip.openUrl(obsidianUri, { activate: false });
}

export const action: Action<Options> = {
  captureHtml: true,
  code(input, options, context) {
    capture(input.markdown.trim(), options, context?.browserUrl, context?.browserTitle);
  },
};

// Note: Run these tests with: `Applications/PopClip.app/Contents/MacOS/PopClip run Config.ts test`
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
