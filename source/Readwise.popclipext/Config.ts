// #popclip
// name: Readwise
// identifier: com.pilotmoon.popclip.extension.readwise
// description: Save a highlight or URL to Readwise.
// popclip version: 4615
// icon: readwise.svg
// apps:
// - { name: Readwise, link: 'https://readwise.io/' }
// entitlements: [network]

import axios from "axios";
const readwise = axios.create({ baseURL: "https://readwise.io/api/" });

const readerIcon = "square filled scale=85 file:readwise.svg";

export const options = [
  {
    identifier: "password",
    type: "password",
    label: "Access Token",
    description: "Get access token from readwise.io/access_token",
  },
  {
    identifier: "heading",
    type: "heading",
    label: "Actions",
  },
  {
    identifier: "highlight",
    type: "boolean",
    label: "Save Highlight",
    icon: "readwise.svg",
  },
  {
    identifier: "article",
    type: "boolean",
    label: "Save Article URL",
    icon: readerIcon,
  },
] as const;

const saveHighlight: ActionFunction<AuthOptions> = async (
  input,
  options,
  context,
) => {
  const payload: Record<string, string> = { text: input.text };
  if (context.browserUrl.length > 0) {
    payload.source_url = context.browserUrl;
  }
  if (context.browserTitle.length > 0) {
    payload.title = context.browserTitle;
  }
  await readwise.post(
    "v2/highlights",
    { highlights: [payload] },
    { headers: { Authorization: `Token ${options.authsecret}` } },
  );
  popclip.showSuccess();
};

const saveUrl: ActionFunction<AuthOptions> = async (
  input,
  options,
  context,
) => {
  const payload: Record<string, string> = { text: input.text };
  if (context.browserUrl.length > 0) {
    payload.source_url = context.browserUrl;
  }
  if (context.browserTitle.length > 0) {
    payload.title = context.browserTitle;
  }
  await readwise.post(
    "v3/save",
    { url: input.data.urls[0], saved_using: "PopClip" },
    { headers: { Authorization: `Token ${options.authsecret}` } },
  );
  popclip.showSuccess();
};

export const actions: Action<AuthOptions>[] = [
  {
    title: "Save Highlight",
    requirements: ["!url"],
    code: saveHighlight,
  },
  {
    title: "Save Article",
    icon: readerIcon,
    requirements: ["url"],
    code: saveUrl,
  },
];

export const auth: AuthFunction = async (info) => {
  const response = await readwise.get("v2/auth", {
    headers: { Authorization: `Token ${info.password}` },
  });
  if (response.status !== 204) {
    throw new Error("Not logged in");
  }
  return info.password;
};
