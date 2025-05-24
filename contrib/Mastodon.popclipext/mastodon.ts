import axios from "axios";

// regex for matching an ActivityPub account, with or without preceding `@`
// e.g. `@feditips@mstdn.social` or `feditips@mstdn.social`
const regex = /@?([\w-]+@[a-zA-Z0-9.-]+)/;

// we need to be able to search for account name then follow it
const scopes = "read:search write:follows";

// helper to create an axios instance for a given server
function getInstance(server: string, token?: string) {
  const headers = { Accept: "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return axios.create({ baseURL: server, headers });
}

// Mastodon auth flow as per https://docs.joinmastodon.org/client/token/
const auth: AuthFunction = async (info, flow) => {
  // slight hack, we use the username field to pass the server name
  const server = info.username.trim();
  const instance = getInstance(server);

  // first register our application
  const { data: { client_id, client_secret } } = await instance.post(
    "/api/v1/apps",
    {
      client_name: "PopClip",
      redirect_uris: info.redirect,
      scopes,
      website: "https://pilotmoon.com/popclip/",
    },
  );

  // next, get the user to authorize us
  const { code } = await flow(server + "/oauth/authorize", {
    client_id,
    response_type: "code",
    redirect_uri: info.redirect,
    scope: scopes,
  }, ["code"]);

  // finally get the access token
  const { data: credentials } = await instance.post("/oauth/token", {
    client_id,
    client_secret,
    redirect_uri: info.redirect,
    grant_type: "authorization_code",
    code,
  });

  // return the server name and token info as a JSON string
  return JSON.stringify({ server, credentials });
};

// follow an ActivityPub account
const follow: ActionFunction = async (input, options) => {
  const accountToFollow = input.regexResult?.[1];
  const { server, credentials } = JSON.parse(options.authsecret);
  const instance = getInstance(server, credentials.access_token);

  // first search for the account
  const { data: { accounts } } = await instance.get("/api/v2/search", {
    params: { q: accountToFollow, resolve: "true" },
  });

  // look through search results to find the account we want
  const id = accounts.find((account) => account.acct === accountToFollow)?.id;
  if (!id) throw new Error("Account not found");

  // follow the account
  await instance.post("/api/v1/accounts/" + id + "/follow");
  popclip.showSuccess();
};

export default {
  action: {
    code: follow,
    title: "Follow on Mastodon"
  },
  auth,
  regex
};
