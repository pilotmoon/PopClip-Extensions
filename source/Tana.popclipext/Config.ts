// #popclip
// name: Tana
// identifier: com.pilotmoon.popclip.extension.tana
// description: Capture text to Tana.
// popclip version: 4615
// icon: tana-icon.svg
// app: { name: Tana, link: 'https://tana.inc/' }
// entitlements: [network]

import axios from "axios";

export const options = [
  {
    identifier: "apiToken",
    label: "API Token",
    type: "secret",
    description: "Obtain an API Token from Tana Settings → API Tokens.",
  },
  {
    identifier: "nodeId",
    label: "Node ID",
    type: "string",
    defaultValue: "INBOX",
    description: "ID of the node to add text to.",
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
] as const;

type Options = InferOptions<typeof options>;

export const action: Action<Options> = {
  captureHtml: true,
  async code(input, options, context) {
    let content = popclip.input.markdown.trim();
    if (options.sourceLink && context?.browserUrl && !input.isUrl) {
      content += `\n<a href="${context?.browserUrl}">${context?.browserTitle || "Source"}</a>`;
    }
    await captureContent(content, options);
    popclip.showSuccess();
  },
};

async function captureContent(content: string, options: Options) {
  const nodes = content.split(/\n+/).map((line) => ({ name: line }));
  await axios.post(
    "https://europe-west1-tagr-prod.cloudfunctions.net/addToNodeV2",
    {
      targetNodeId: options.nodeId,
      nodes,
    },
    {
      headers: { Authorization: `Bearer ${options.apiToken}` },
    },
  );
}

export async function test() {
  await captureContent(
    `Hello World\n<a href="https://example.com">Source</a>`,
    {
      nodeId: "INBOX",
      sourceLink: false,
      apiToken: "API_TOKEN_HERE",
    },
  );
}
