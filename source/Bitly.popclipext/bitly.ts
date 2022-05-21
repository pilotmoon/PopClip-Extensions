/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios'
import { replaceRangesAsync } from '@popclip/helpers/replace-ranges'
import { concurrentTransform } from '@popclip/helpers/generator'
import { client } from './client.json'

// bitly api endpoint
const bitly = axios.create({ baseURL: 'https://api-ssl.bitly.com/', headers: { Accept: 'application/json' } })

async function shorten (url: string): Promise<string> {
  const headers = { Authorization: `Bearer ${popclip.options.authsecret}` }
  const response = await bitly.post('v4/shorten', { long_url: url }, { headers })
  return response.data.link
}

// replace all matched urls with their shortened equivalents, calling duplicates only once
export const action: Action = async (input) => {
  return await replaceRangesAsync(input.text, input.data.urls.ranges, concurrentTransform(input.data.urls, shorten))
}

// sign in to bitly using authorization flow
export const auth: AuthFunction = async (info, flow) => {
  const redirect_uri = 'popclip://callback?popclip_ext_id=' + info.identifier // old style callback is registered with bitly
  const { client_id, client_secret } = util.clarify(client)
  const { code } = await flow('https://bitly.com/oauth/authorize', { client_id, redirect_uri })
  const response = await bitly.post('oauth/access_token', new URLSearchParams(
    { client_id, client_secret, redirect_uri, code }
  ))
  return response.data.access_token
}
