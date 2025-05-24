// #popclip
// name: ClickUp
// identifier: com.pilotmoon.popclip.extension.clickup
// description: Create a task in ClickUp.
// popclip version: 4615
// icon: iconify:simple-icons:clickup
// app: { name: ClickUp, link: https://clickup.com/ }
// entitlements: [network]

import axios from "axios";
import { client } from "./client.json";

export const options = [
  {
    identifier: "listUrl",
    label: "List URL",
    type: "string",
    description: `URL of the list to add tasks to (get with "Copy Link").`,
  },
] as const;
type Options = InferOptions<typeof options> & AuthOptions;

export const auth: AuthFunction = async (info, flow) => {
  const { client_id, client_secret } = util.clarify(client);
  const redirect_uri = info.redirect;
  const { code } = await flow("https://app.clickup.com/api", {
    client_id,
    redirect_uri,
  });
  const { data } = await axios.post(
    "https://api.clickup.com/api/v2/oauth/token",
    {
      client_id,
      client_secret,
      code,
    },
  );
  return JSON.stringify(data);
};

export const action: Action<Options> = {
  async code(input, options, context) {
    // use the full selected text as the task description
    let description = input.text;

    // add the URL to the description if available
    if (context.browserUrl) {
      description += `\nSource: ${context.browserUrl}`;
    }

    // use first line as task name, and limit to 100 characters
    let name = input.text.split("\n")[0];
    if (name.length > 100) {
      name = name.slice(0, 99) + "…";
    }

    await addTask(name, description, options);
    popclip.showSuccess();
  },
};

async function addTask(name: string, description: string, options: Options) {
  const { access_token } = JSON.parse(options.authsecret);
  const listId = Number.parseInt(
    /\/li\/(\d+)$/.exec(options.listUrl)?.[1] ?? "",
  );
  if (!listId) throw new Error("Settings error: Invalid list URL");
  await axios.post(
    `https://api.clickup.com/api/v2/list/${listId}/task`,
    {
      name,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
}

export async function test() {
  await addTask("Hello, world!", "desc", {
    authsecret: `{
      "access_token": "xxx",
      "token_type": "Bearer"
      }`,
    listUrl: "xxx",
  });
}
