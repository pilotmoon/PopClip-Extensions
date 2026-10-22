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

// Add markdown link builder (allows testing)
function buildMarkdownLink(url: string, title?: string): string {
  return `[${title || "Source"}](${url})`;
}

// Compare two URLs after normalizing them with the URL parser, so that
// e.g. `https://wasp.sh` and `https://wasp.sh/` are treated as the same.
function isSameUrl(a: string, b: string): boolean {
  try {
    return new URL(a).href === new URL(b).href;
  } catch {
    return a === b;
  }
}

export function buildContent(
  copiedText: string,
  options: Options,
  url?: string,
  title?: string,
  now: Date = new Date(),
  selectedUrl?: string
): string {
  let result = "";

  if (options.sourceLink && url) {
    // If the selection is just the page's own URL, output only the link.
    if (selectedUrl && isSameUrl(selectedUrl, url)) {
      result += buildMarkdownLink(url, title);
    } else {
      result += copiedText + `\n` + buildMarkdownLink(url, title);
    }
  } else {
    result += copiedText;
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

export function buildUri(
  copiedText: string,
  options: Options,
  url?: string,
  title?: string,
  selectedUrl?: string
): string {
  const uriData = buildContent(copiedText, options, url, title, new Date(), selectedUrl);

  const uri = new URL("obsidian://advanced-uri");
  uri.searchParams.append("vault", options.vaultName);
  if (options.fileName) {
    uri.searchParams.append("filename", options.fileName);
  } else {
    uri.searchParams.append("daily", "true");
  }
  if (options.heading) {
    uri.searchParams.append("heading", options.heading);
  }
  uri.searchParams.append("data", uriData);
  uri.searchParams.append("mode", options.newFile ? "new" : "append");

  // Convert from form-style query encoding to conventional percent encoding
  const result = uri.href.replace(/\+/g, "%20");
  return result;
}

function capture(
  copiedText: string,
  options: Options,
  url?: string,
  title?: string,
  selectedUrl?: string
) {
  const href = buildUri(copiedText, options, url, title, selectedUrl);
  popclip.openUrl(href, { activate: false });
}

export const action: Action<Options> = {
  captureHtml: true,
  code(input, options, context) {
    // When the selection is just a URL, use PopClip's parsed form of it.
    const selectedUrl = input.isUrl ? input.data.urls[0] : undefined;
    capture(
      input.markdown.trim(),
      options,
      context?.browserUrl,
      context?.browserTitle,
      selectedUrl
    );
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
