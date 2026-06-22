/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-var-requires */

import { Client } from "evernote";
import { consumer } from "./consumer.json";
import { renderEnml } from "./enml";

const { consumerKey, consumerSecret } = util.clarify(consumer);

// this keeps oauth module happy
const g: any = globalThis;
g.location = { protocol: "https:" };

type RequestTokenResult = {
  requestToken: string;
  requestTokenSecret: string;
};

type AccessTokenResult = {
  accessToken: string;
  results: Record<string, string>;
};

const getRequestToken = (
  client: Client,
  redirect: string,
): Promise<RequestTokenResult> =>
  new Promise((resolve, reject) => {
    client.getRequestToken(
      redirect,
      (error: unknown, requestToken: string, requestTokenSecret: string) => {
        if (error !== null && error !== undefined) {
          reject(error);
          return;
        }
        if (
          typeof requestToken !== "string" ||
          requestToken.length === 0 ||
          typeof requestTokenSecret !== "string" ||
          requestTokenSecret.length === 0
        ) {
          reject(new Error("bad requestToken or requestTokenSecret"));
          return;
        }
        resolve({ requestToken, requestTokenSecret });
      },
    );
  });

const getAccessToken = (
  client: Client,
  requestToken: string,
  requestTokenSecret: string,
  oauthVerifier: string,
): Promise<AccessTokenResult> =>
  new Promise((resolve, reject) => {
    client.getAccessToken(
      requestToken,
      requestTokenSecret,
      oauthVerifier,
      (
        error: unknown,
        accessToken: string,
        _accessTokenSecret: string,
        results: Record<string, string>,
      ) => {
        if (error !== null && error !== undefined) {
          reject(error);
          return;
        }
        if (typeof accessToken !== "string" || accessToken.length === 0) {
          reject(new Error("bad accessToken"));
          return;
        }
        resolve({ accessToken, results });
      },
    );
  });

const getAccountLabel = async (
  accessToken: string,
): Promise<string | undefined> => {
  try {
    const user = await new Client({
      token: accessToken,
      sandbox: false,
    })
      .getUserStore()
      .getUser();
    return user?.username || user?.name || undefined;
  } catch (e) {
    return undefined;
  }
};

// sign in to evernote using its delightfully byzantine oauth system
const auth: AuthFunction = async (info, flow) => {
  const client = new Client({
    consumerKey,
    consumerSecret,
    sandbox: false,
  });
  const { requestToken, requestTokenSecret } = await getRequestToken(
    client,
    info.redirect,
  );
  const { oauth_verifier } = await flow(client.getAuthorizeUrl(requestToken));
  const { accessToken, results } = await getAccessToken(
    client,
    requestToken,
    requestTokenSecret,
    oauth_verifier,
  );

  // The access-token response carries `edam_expires`, the absolute expiry of the auth
  // token in milliseconds since the epoch. Convert it to a lifetime in seconds so PopClip
  // can tell when the token has expired and prompt the user to sign in again.
  const edamExpires = Number(results?.edam_expires);
  const expiresIn =
    Number.isFinite(edamExpires) && edamExpires > 0
      ? Math.max(0, Math.round((edamExpires - Date.now()) / 1000))
      : undefined;
  const label = await getAccountLabel(accessToken);

  const result: AuthResult = { secret: accessToken };
  if (label !== undefined) result.label = label;
  if (expiresIn !== undefined) result.expiresIn = expiresIn;
  return result;
};

const action: ActionFunction = async (input, options, context) => {
  const content = renderEnml(input.html);
  const title =
    context.browserTitle.length > 0 ? context.browserTitle : "New Note";
  const attributes: any = { sourceApplication: "PopClip" };
  if (context.browserUrl.length > 0) {
    attributes.sourceURL = context.browserUrl;
  }
  const note = { title, content, attributes };
  try {
    const authenticatedClient = new Client({
      token: options.authsecret,
      sandbox: false,
    });
    const noteStore = authenticatedClient.getNoteStore();
    const status = await noteStore.createNote(note);
    print("status", status);
  } catch (e) {
    throw new Error("Evernote API error: " + JSON.stringify(e));
  }
  popclip.showSuccess();
};

export default { action, auth };
