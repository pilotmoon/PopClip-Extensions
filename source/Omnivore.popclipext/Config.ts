// #popclip
// name: Omnivore
// identifier: com.pilotmoon.popclip.extension.omnivore
// description: Save the URL to read later with Omnivore.
// popclip version: 4688
// icon: scale=90 file:omnivore-logo.png
// entitlements: [network]
// app: { name: Omnivore, link: https://omnivore.app/ }

import axios from "axios";

export const options = [
  {
    identifier: "apiKey",
    type: "secret",
    label: "API Key",
    description: "Get it from https://omnivore.app/settings/api",
  },
] as const;
type Options = InferOptions<typeof options>;

export const action: Action<Options> = {
  requirements: ["url"],
  async code(input, options) {
    await addToOmnivore(input.data.urls[0], options);
    popclip.showSuccess();
  },
};

async function addToOmnivore(url: string, options: Options) {
  const query = saveUrlQuery(url);
  print({ url, query });
  await axios.post("https://api-prod.omnivore.app/api/graphql", query, {
    headers: {
      Authorization: options.apiKey,
    },
  });
}

// graphql query for saving a URL to Omnivore (from API docs)
function saveUrlQuery(url: string) {
  return {
    query:
      "mutation SaveUrl($input: SaveUrlInput!) { saveUrl(input: $input) { ... on SaveSuccess { url clientRequestId } ... on SaveError { errorCodes message } } }",
    variables: {
      input: {
        clientRequestId: util.randomUuid(),
        source: "api",
        url,
      },
    },
  };
}

export async function test() {
  const opts = { apiKey: "API_KEY_HERE" };
  await addToOmnivore("https://example.com", opts);
}
