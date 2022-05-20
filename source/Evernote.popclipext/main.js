"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Where does the the `evernote.js` come from?
It is the npm module `evernote`, that has been packed using browserify.
I installed the npm module using `npm install evernote` then wrapped it up
using `./bin/getmodules evernote` (tool in this repo).
-Nick
*/
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-var-requires */
const enml_1 = require("./enml");
const consumer_json_1 = require("./consumer.json");
const evernote_1 = require("evernote");
const { consumerKey, consumerSecret } = util.clarify(consumer_json_1.consumer);
// this keeps oauth module happy
const g = globalThis;
g.location = { protocol: 'https:' };
// sign in to evernote using its delightfully byzantine oauth system
const auth = async (info, flow) => await new Promise(function (resolve, reject) {
    const client = new evernote_1.Client({
        consumerKey,
        consumerSecret,
        sandbox: false
    });
    client.getRequestToken(info.redirect, async function (_, requestToken, requestTokenSecret) {
        if (typeof requestToken === 'string' && requestToken.length > 0 && typeof requestTokenSecret === 'string' && requestTokenSecret.length > 0) {
            const { oauth_verifier } = await flow(client.getAuthorizeUrl(requestToken));
            client.getAccessToken(requestToken, requestTokenSecret, oauth_verifier, function (_, accessToken) {
                if (typeof accessToken === 'string' && accessToken.length > 0) {
                    resolve(accessToken);
                }
                else {
                    reject(new Error('bad accessToken'));
                }
            });
        }
        else {
            reject(new Error('bad requestToken or requestTokenSecret'));
        }
    });
});
const action = async (input, options, context) => {
    const content = (0, enml_1.renderEnml)(input.html);
    const title = context.browserTitle.length > 0 ? context.browserTitle : 'New Note';
    const attributes = { sourceApplication: 'PopClip' };
    if (context.browserUrl.length > 0) {
        attributes.sourceURL = context.browserUrl;
    }
    const note = { title, content, attributes };
    try {
        const authenticatedClient = new evernote_1.Client({
            token: options.authsecret,
            sandbox: false
        });
        const noteStore = authenticatedClient.getNoteStore();
        const status = await noteStore.createNote(note);
        print('status', status);
    }
    catch (e) {
        throw new Error('Evernote API error: ' + JSON.stringify(e));
    }
    popclip.showSuccess();
    return null;
};
exports.default = { action, auth };
