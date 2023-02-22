"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.action = exports.regex = void 0;
const axios_1 = require("axios");
// regex for matching an ActivityPub account, with or without preceding `@`
// e.g. @feditips@mstdn.social
exports.regex = /@?([\w-]+@[a-zA-Z0-9.-]+)/;
// we need to be able to search for account name then follow it
const scopes = "read:search write:follows";
// helper to create an axios instance for a given server
function getInstance(server, token = null) {
  const headers = { Accept: "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return axios_1.default.create({ baseURL: server, headers });
}
// Mastodon auth flow as per https://docs.joinmastodon.org/client/token/
const auth = async (info, flow) => {
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
exports.auth = auth;
// follow an ActivityPub account
const action = async (input, options) => {
  const accountIdentifier = input.regexResult[1];
  const { server, credentials } = JSON.parse(options.authsecret);
  const instance = getInstance(server, credentials.access_token);
  // first search for the account
  const { data: { accounts } } = await instance.get("/api/v2/search", {
    params: { q: accountIdentifier, resolve: "true" },
  });
  // look through search results to find the account we want
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
  await instance.post("/api/v1/accounts/" + id + "/follow");
  popclip.showSuccess();
  return null;
};
exports.action = action;
action.title = "Follow on Mastodon";
