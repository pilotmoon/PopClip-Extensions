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

function capture(markdown: string, options: Options) {
  if (options.includeTimestamp) {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    markdown = `- ${timestamp} ${markdown}`;
  }

  const url = new URL("obsidian://advanced-uri");
  url.searchParams.append("vault", options.vaultName);
  if (options.fileName) {
    url.searchParams.append("filename", options.fileName);
  } else {
    url.searchParams.append("daily", "true");
  }
  if (options.heading) {
    url.searchParams.append("heading", options.heading);
  }
  url.searchParams.append("data", markdown);
  url.searchParams.append("mode", options.newFile ? "new" : "append");
  popclip.openUrl(url, { activate: false });
}

export const action: Action<Options> = {
  captureHtml: true,
  code(input, options, context) {
    let content = (options.newFile ? "" : "\n") + input.markdown.trim();
    if (options.sourceLink && context?.browserUrl) {
      content += `\n[${context?.browserTitle || "Source"}](${
        context?.browserUrl
      })`;
    }
    capture(content, options);
  },
};

export async function test() {
  capture("in clippings file, no heading", {
    vaultName: "Dry, Dark Place",
    fileName: "Clippings",
    heading: "",
    newFile: false,
    sourceLink: true,
    includeTimestamp: true,
  });
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
