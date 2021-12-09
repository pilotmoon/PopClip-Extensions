/*
Where does the the `evernote.js` come from?
It is the npm module `evernote`, that has been packed using browserify.
I installed the npm module using `npm install evernote` then wrapped it up
using `./bin/getmodules evernote` (tool in this repo).
-Nick
*/
/* eslint-disable @typescript-eslint/naming-convention */
import { Client } from './evernote.js'
import { parseHTML } from 'linkedom'

const htmlparser2: any = require('htmlparser2')
const render: any = require('dom-serializer')

// this keeps oauth module happy
globalThis.location = { protocol: 'https:' }

// sign in to evernote using its delightfully byzantine oauth system
export const auth: AuthFunction = async (info, flow) => await new Promise(function (resolve, reject) {
  const client = new Client({
    consumerKey: 'nim305',
    consumerSecret: '96a67259133b5fd1',
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

export const action: ActionFunction = async (input, options) => {
  // oauthAccessToken is the token you need;
  // var authenticatedClient = new Client({
  //   token: options.authsecret,
  //   sandbox: true
  // })

  // const { document } = parseHTML(input.html)
  // const xhtml = document.toString()
  const dom = htmlparser2.parseDocument(input.html)
  const xhtml = render(dom, { xmlMode: true })
  print('xhtml', xhtml)
  // var noteStore = authenticatedClient.getNoteStore()
  // const notebooks = await noteStore.listNotebooks()
  // print('notebooks', notebooks) // the user's notebooks!
}
