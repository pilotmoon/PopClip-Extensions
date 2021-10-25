/* eslint-disable @typescript-eslint/naming-convention */
// reimplementation of Bitly ext (as callback auth test)
import axios from 'axios'
import { client } from './client.json'
const { client_id, client_secret } = util.clarify(client)
const bitly = axios.create({ baseURL: 'https://api-ssl.bitly.com/', headers: { Accept: 'application/json' } })

// the extension object
const extension: Extension = {}

// shorten URL with bitly
extension.action = async (selection, context, options) => {
  const access_token = options.authsecret as string
  const response = await bitly.post('v4/shorten', {
    long_url: selection.data.webUrls[0]
  }, { headers: { Authorization: `Bearer ${access_token}` } })
  popclip.pasteText((response.data as any).link)
  popclip.showSuccess()
}

// sign in to bitly using authorization flow
extension.auth = async (info, flow) => {
  const redirect_uri = info.redirect
  const { code } = await flow('https://bitly.com/oauth/authorize', { client_id, redirect_uri })
  const response = await bitly.post('oauth/access_token', util.buildQuery({
    client_id, client_secret, redirect_uri, code
  }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
  return (response.data as any).access_token
}

module.exports = extension
