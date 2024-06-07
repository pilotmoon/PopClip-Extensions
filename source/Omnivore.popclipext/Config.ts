// #popclip
// name: Omnivore
// identifier: com.pilotmoon.popclip.extension.omnivore
// description: Save the URL to read later with Omnivore.
// popclip version: 4615
// icon: omnivore-logo.png
// entitlements: [network]
// app: { name: Omnivore, link: https://omnivore.app/ }

import axios from "axios";

export const options: Option[] = [
  {
    identifier: "apiKey",
    type: "secret",
    label: "API Key",
    description: "See: https://app.omnivore.app/settings/api",
  },
];
type OmnivoreOptions = {
  apiKey: string;
};

export const action: Action<OmnivoreOptions> = {
  requirements: ["url"],
  async code(input, options) {
    await addToOmnivore(input.data.urls[0], options);
    popclip.showSuccess();
  },
};

async function addToOmnivore(url: string, options: OmnivoreOptions) {
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
        clientRequestId: uuid(),
        source: "api",
        url,
      },
    },
  };
}

// noddy uuid v4 generator
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function test() {
  print({ uuids: [uuid(), uuid(), uuid()] });
  const opts = { apiKey: "API_KEY_HERE" };
  await addToOmnivore("https://example.com", opts);
}
