/*
Where does the the `evernote.js` come from?
It is the npm module `evernote`, that has been packed using browserify.
I installed the npm module using `npm install evernote` then wrapped it up
using `./bin/getmodules evernote` (tool in this repo).
-Nick
*/
/* eslint-disable @typescript-eslint/naming-convention */
import { Client } from './evernote.js'
import { renderEnml } from './enml.js'
import { consumer } from './consumer.json'

const { consumerKey, consumerSecret } = util.clarify(consumer)

// this keeps oauth module happy
globalThis.location = { protocol: 'https:' }

// sign in to evernote using its delightfully byzantine oauth system
export const auth: AuthFunction = async (info, flow) => await new Promise(function (resolve, reject) {
  const client = new Client({
    consumerKey,
    consumerSecret,
    sandbox: true // change to false when you are ready to switch to production
  })
  client.getRequestToken(info.redirect, async function (_, oauthToken, oauthTokenSecret) {
    if (typeof oauthToken === 'string' && oauthToken.length > 0) {
      const { oauth_verifier } = await flow(client.getAuthorizeUrl(oauthToken))
      client.getAccessToken(oauthToken, oauthTokenSecret, oauth_verifier, function (_, oauthToken) {
        if (typeof oauthToken === 'string' && oauthToken.length > 0) {
          resolve(oauthToken)
        }
      })
    }
  })
})

export const action: ActionFunction = async (input, options, context) => {
  print('input.html', input.html)
  const enml = renderEnml(input.html)
  print('enml', enml)

  // create note data
  const title = context.browserTitle.length > 0 ? context.browserTitle : 'New Note'
  const note: any = {
    title,
    content: enml,
    attributes: {
      sourceApplication: 'PopClip'
    }
    // tagNames: [
    //   'popclip test tag', 'anoTher'
    // ]
  }
  if (context.browserUrl.length > 0) {
    note.attributes.sourceURL = context.browserUrl
  }

  try {
    const authenticatedClient = new Client({
      token: options.authsecret,
      sandbox: true
    })
    const noteStore = authenticatedClient.getNoteStore()
    const status = await noteStore.createNote(note)
    print('status', status)
  } catch (e) {
    throw new Error('Evernote API error: ' + JSON.stringify(e))
  }
  popclip.showSuccess()
}
