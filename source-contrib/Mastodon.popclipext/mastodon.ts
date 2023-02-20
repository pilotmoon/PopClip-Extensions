import axios from "axios";

// regex for matchin ActivityPub account with or without preceding @
// e.g. @feditips@mstdn.social
export const regex = /@?([\w-]+@[a-zA-Z0-9.-]+)/;

// we need to be able to search for accoun name then follow it
const scopes = "read:search write:follows";

// helper to create an axios instance for a given server
function getInstance(server: string, token: string | null = null) {
  const headers = { Accept: "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return axios.create({ baseURL: server, headers });
}

// Mastodon auth flow as per https://docs.joinmastodon.org/client/token/
const auth: AuthFunction = async (info, flow) => {
  // slight hack, we use the username field to get the server name
  const server = info.username.trim();

  // first register our application
  const appResponse = await getInstance(server).post("/api/v1/apps", {
    client_name: "PopClip",
    redirect_uris: info.redirect,
    scopes,
    website: "https://pilotmoon.com/popclip/",
  });

  // next, get the user to authorize us
  const { client_id, client_secret } = appResponse.data;
  const { code } = await flow(server + "/oauth/authorize", {
    client_id,
    response_type: "code",
    redirect_uri: info.redirect,
    scope: scopes,
  });

  // finally get the access token
  const tokenResponse = await getInstance(server).post("/oauth/token", {
    client_id,
    client_secret,
    redirect_uri: info.redirect,
    grant_type: "authorization_code",
    code,
  });

  // return the server name and token info as a JSON string
  return JSON.stringify({
    server: server,
    credentials: tokenResponse.data,
  });
};

// follow an ActivityPub account
const action: ActionFunction = async (input, options) => {
  const accountIdentifier = input.regexResult[1];
  const { server, credentials } = JSON.parse(options.authsecret);
  const instance = await getInstance(server, credentials.access_token);

  // first search for the account
  const searchResponse = await instance.get("/api/v2/search", {
    params: { q: accountIdentifier, resolve: "true" },
  });
  const accounts = searchResponse.data.accounts;
  print("accounts", accounts);
  if (!accounts.length) {
    throw new Error("Search returned no results");
  }

  // find the account we want
  let id;
  for (const account of accounts) {
    if (account.acct === accountIdentifier) {
      id = account.id;
      break;
    }
  }
  if (!id) {
    throw new Error("Account not found");
  }

  // follow the account
  const followResponse = await instance.post(
    "/api/v1/accounts/" + id + "/follow",
  );
  print("followResponse", followResponse);
  popclip.showSuccess();
  return null;
};
action.title = "Follow on Mastodon";

export { action, auth };
