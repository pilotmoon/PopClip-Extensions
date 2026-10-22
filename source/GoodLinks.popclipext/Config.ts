// #popclip
// name: GoodLinks
// identifier: com.pilotmoon.popclip.extension.goodlinks
// description: Save the URL to GoodLinks.
// icon: scale=120 iconify:material-symbols:bookmark-star-outline-rounded
// app: { name: GoodLinks, link: https://goodlinks.app/ }
// popclip version: 5155
// entitlements: [network]

import axios from "axios";

const GOODLINKS_API_ROOT = "http://localhost:9428/api/v1";

export const options = [
  {
    identifier: "apiToken",
    label: "API Token",
    type: "secret",
    description:
      "Enable the API Server in GoodLinks settings, then copy the token.",
  },
  {
    identifier: "tags",
    label: "Default Tags",
    type: "string",
    description: "Optional comma-separated tags to apply when saving links.",
  },
  {
    identifier: "starred",
    label: "Star by default",
    type: "boolean",
    defaultValue: false,
    description: "Add saved links to the Starred list.",
  },
  {
    identifier: "read",
    label: "Mark as read",
    type: "boolean",
    defaultValue: false,
    description: "Mark saved links as read immediately.",
  },
] as const;

type Options = InferOptions<typeof options>;

interface GoodLinksPayload {
  url: string;
  title?: string;
  tags?: string[];
  starred?: boolean;
  read?: boolean;
}

export const action: Action<Options> = {
  requirements: ["url"],
  async code(input, options) {
    try {
      await saveLink(input.data.urls[0], options);
      popclip.showSuccess();
    } catch (error) {
      const message = getErrorMessage(error);
      popclip.showText(`GoodLinks Error: ${message}`);
      throw error;
    }
  },
};

async function saveLink(url: string, options: Options): Promise<void> {
  const apiToken = (options.apiToken ?? "").trim();
  if (!apiToken) {
    throw new Error("Missing API token");
  }

  const payload: GoodLinksPayload = {
    url,
    starred: options.starred,
    read: options.read,
  };

  const tags = parseTags(options.tags);
  if (tags.length > 0) {
    payload.tags = tags;
  }

  await axios.post(`${GOODLINKS_API_ROOT}/links`, payload, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    timeout: 10000,
  });
}

function parseTags(value: string | undefined): string[] {
  return [
    ...new Set(
      (value ?? "")
        .split(/[,\n]/)
        .map((tag) => tag.trim())
        .filter(Boolean),
    ),
  ];
}

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const data = error.response.data;
      if (data && typeof data === "object" && "error" in data) {
        return String(data.error);
      }
      if (error.response.status === 401) {
        return "Unauthorized. Check the API token in GoodLinks settings.";
      }
      return `Request failed with status ${error.response.status}.`;
    }
    if (error.request) {
      return "Could not reach GoodLinks. Check that the app is running, the API is enabled, and the API root is correct.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

export async function test() {
  await saveLink("https://example.com/article", {
    apiToken: "API_TOKEN_HERE",
    tags: "reading, popclip",
    starred: false,
    read: false,
  });
}
