"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = exports.auth = void 0;
/*
Where does the the `evernote-api.js` file come from?
It is the npm module `evernote`, that has been packed using browserify and minified.
I installed the npm module using `npm install evernote` then wrapped it up
using `./bin/getmodules evernote` (tool in this repo). Then I renamed with -api suffix.
-Nick
*/
/* eslint-disable @typescript-eslint/naming-convention */
const evernote_1 = require("evernote");
// this keeps oauth module happy
globalThis.location = { protocol: 'https:' };
// sign in to evernote
const auth = async (info, flow) => await new Promise(function (resolve, reject) {
    const client = new evernote_1.Client({
        consumerKey: 'nim305',
        consumerSecret: '96a67259133b5fd1',
        sandbox: true // change to false when you are ready to switch to production
    });
    client.getRequestToken(info.redirect, async function (_, oauthToken, oauthTokenSecret) {
        if (typeof oauthToken === 'string' && oauthToken.length > 0) {
            const { oauth_verifier } = await flow(client.getAuthorizeUrl(oauthToken));
            client.getAccessToken(oauthToken, oauthTokenSecret, oauth_verifier, function (_, oauthToken) {
                if (typeof oauthToken === 'string' && oauthToken.length > 0) {
                    resolve(oauthToken);
                }
            });
        }
    });
});
exports.auth = auth;
const action = async (input, options) => {
    // oauthAccessToken is the token you need;
    var authenticatedClient = new evernote_1.Client({
        token: options.authsecret,
        sandbox: true
    });
    var noteStore = authenticatedClient.getNoteStore();
    const notebooks = await noteStore.listNotebooks();
    print(notebooks); // the user's notebooks!
};
exports.action = action;
