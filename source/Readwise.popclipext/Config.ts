// #popclip
// name: Readwise
// identifier: com.pilotmoon.popclip.extension.readwise
// description: Save the selected text as a highlight in Readwise.
// popclip version: 4615
// icon: readwise-logo.svg
// app: { name: Readwise, link: 'https://readwise.io/' }
// entitlements: [network]

import axios from "axios";
const readwise = axios.create({ baseURL: "https://readwise.io/api/v2/" });

export const options = [
  {
    identifier: "password",
    type: "password",
    label: "Access Token",
    description: "Get access token from readwise.io/access_token",
  },
] as const;

export const action: ActionFunction<AuthOptions> = async (
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
    "highlights/",
    { highlights: [payload] },
    { headers: { Authorization: `Token ${options.authsecret}` } },
  );
  popclip.showSuccess();
};

export const auth: AuthFunction = async (info) => {
  const response = await readwise.get("auth/", {
    headers: { Authorization: `Token ${info.password}` },
  });
  if (response.status !== 204) {
    throw new Error("Not logged in");
  }
  return info.password;
};
