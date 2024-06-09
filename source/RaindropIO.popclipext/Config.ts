// #popclip
// name: Raindrop.io
// identifier: com.miller.popclip.extension.raindrop
// description: Bookmark a URL with Raindrop.io.
// popclipVersion: 4516
// icon: raindropio-logo.svg
// app: { link: https://raindrop.io/, name: Raindrop.io }
// entitlements: [network]

import { client } from "./client.json";
import axios from "axios";
const { client_id, client_secret } = util.clarify(client);

// export a single action that requires a url as input
export const action: Action<AuthOptions> = {
  requirements: ["url"],
  async code(input, options) {
    await createRaindrop(input.data.urls[0], options);
    popclip.showSuccess();
  },
};

// the auth function is called when the user signs in to the extension
export const auth: AuthFunction = async (info, flow) => {
  const redirect_uri = info.redirect;
  const { code } = await flow("https://raindrop.io/oauth/authorize", {
    client_id,
    redirect_uri,
  });
  const { data } = await axios.post("https://raindrop.io/oauth/access_token", {
    grant_type: "authorization_code",
    code,
    client_id,
    client_secret,
    redirect_uri,
  });
  saveToken(data);
  return JSON.stringify(data); // this is saved to the user's keychain
};

// we memo the access token and its expiry time
let access_token: string;
let expires_at: number;
function saveToken(data: any) {
  access_token = data.access_token;
  expires_at = Date.now() + data.expires_in * 1000;
}

// return an access token, refreshing it if necessary
async function getAccessToken(options: AuthOptions) {
  if (!access_token || Date.now() >= expires_at) {
    const params = JSON.parse(options.authsecret);
    const { data } = await axios.post(
      "https://raindrop.io/oauth/access_token",
      {
        grant_type: "refresh_token",
        client_id,
        client_secret,
        refresh_token: params.refresh_token,
      },
    );
    saveToken(data);
  }
  return access_token;
}

// endpoint for accessing the raindrop.io api
function api(access_token: string) {
  return axios.create({
    baseURL: "https://api.raindrop.io/rest/v1",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

// create the "raindrop" (bookmark) from the given url
async function createRaindrop(url: string, options: AuthOptions) {
  await api(await getAccessToken(options)).post("/raindrop", {
    link: url,
    pleaseParse: {},
  });
}

// test function (not part of the extension, but can be called with the test harness)
export async function test() {
  createRaindrop(
    "https://www.astronomy.com/science/weird-repeating-radio-signal-space-stumps-astronomers/",
    {
      authsecret: JSON.stringify({
        refresh_token: "XXX",
      }),
    },
  );
}
