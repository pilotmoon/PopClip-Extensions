/* eslint-disable @typescript-eslint/naming-convention */
// reimplementation of Bitly ext (as callback auth test)
import axios from 'axios'
import { client } from './client.json'
import { replaceRanges } from './@popclip/replace'
const { client_id, client_secret } = util.clarify(client)
const bitly = axios.create({ baseURL: 'https://api-ssl.bitly.com/', headers: { Accept: 'application/json' } })

// replace all matched urls with thier shortened equivalents
export const action: Action = async (input) => {
  const access_token = popclip.options.authsecret
  const shortUrls: string[] = []
  for (const url of input.data.urls) {
    const response = await bitly.post('v4/shorten', { long_url: url }, {
      headers: { Authorization: `Bearer ${access_token}` }
    })
    shortUrls.push((response.data as any).link)
  }
  return replaceRanges(input.text, input.data.urls.ranges, (_, index) => shortUrls[index])
}

// sign in to bitly using authorization flow
export const auth: AuthFunction = async (info, flow) => {
  const redirect_uri = info.redirect
  const { code } = await flow('https://bitly.com/oauth/authorize', { client_id, redirect_uri })
  const response = await bitly.post('oauth/access_token', util.buildQuery({
    client_id, client_secret, redirect_uri, code
  }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
  return (response.data as any).access_token
}
