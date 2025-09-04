// #popclip
// name: Flomo
// identifier: com.popclip.extension.popcliptoflomo
// description: Save selected text to flomo via incoming webhook API.
// icon: flomoapp.png
// popclip version: 4688
// apps:
// - { name: flomo, link: 'https://flomoapp.com/' }
// entitlements: [network]

import axios from "axios";

export const options = [
  {
    identifier: "apiurl",
    label: "Flomo API URL",
    type: "string",
    description:
      "Your flomo incoming webhook URL (get it from https://flomoapp.com/mine?source=incoming_webhook)",
  },
] as const;

type Options = InferOptions<typeof options>;

export const action: ActionFunction<Options> = async (input, options) => {
  const url = options.apiurl.trim();
  if (url.length === 0) {
    throw new Error("Settings error: API URL not configured");
  }
  const content = input.text.trim();
  try {
    await axios.post(
      url,
      { content },
      { headers: { "Content-Type": "application/json" } },
    );
    popclip.showSuccess();
  } catch (e) {
    popclip.showText(String(e));
  }
};
