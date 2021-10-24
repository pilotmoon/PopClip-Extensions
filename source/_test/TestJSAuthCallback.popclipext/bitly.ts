/* eslint-disable @typescript-eslint/naming-convention */
// reimplementation of Bitly ext (as callback auth test)
import axios from 'axios'
import { client } from './client.json'
const bitly = axios.create({ baseURL: 'https://api-ssl.bitly.com/', headers: { Accept: 'application/json' } })

// shorten URL with bitly
export const action: ActionFunction = async (selection, context, options) => {
  const access_token = options.authsecret as string
  const response = await bitly.post('v4/shorten', {
    long_url: selection.data.webUrls[0]
  }, { headers: { Authorization: `Bearer ${access_token}` } })
  popclip.pasteText((response.data as any).link)
  popclip.showSuccess()
}

// sign in using authorization flow
export const auth: AuthFunction = async (info, flow) => {
  const { client_id, client_secret } = JSON.parse(util.base64Decode(client))
  const redirect_uri = util.authRedirectUrl(['code'])
  const { code } = await flow('https://bitly.com/oauth/authorize', { client_id, redirect_uri })
  const response = await bitly.post('oauth/access_token', util.buildQuery({
    client_id, client_secret, redirect_uri, code
  }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
  return (response.data as any).access_token
}
