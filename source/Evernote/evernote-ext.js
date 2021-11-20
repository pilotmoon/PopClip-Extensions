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
// this is required for oauth module
globalThis.location = { protocol: 'https:' };
const client = new evernote_1.Client({
    consumerKey: 'nim305',
    consumerSecret: '96a67259133b5fd1',
    sandbox: true // change to false when you are ready to switch to production
});
// sign in to bitly using authorization flow
const auth = async (info, flow) => await new Promise(function (resolve, reject) {
    client.getRequestToken(info.redirect, async function (error, oauthToken, oauthTokenSecret) {
        if (typeof oauthToken !== 'string' || oauthToken.length === 0) {
            // do your error handling here
            reject(new Error(`Failed getting request token (${JSON.stringify(error)})`));
        }
        else {
            print('request token', oauthToken);
            const url = client.getAuthorizeUrl(oauthToken);
            print('url', url);
            try {
                const { oauth_verifier } = await flow(url);
                print('oauth_verifier', oauth_verifier);
                // get access token
                client.getAccessToken(oauthToken, oauthTokenSecret, oauth_verifier, function (error, oauthToken, oauthTokenSecret, results) {
                    if (typeof oauthToken !== 'string' || oauthToken.length === 0) {
                        reject(new Error(`Failed getting access token (${JSON.stringify(error)})`));
                    }
                    else {
                        print('access token', oauthToken);
                        resolve(oauthToken);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        }
    });
});
exports.auth = auth;
const action = (input) => {
};
exports.action = action;
