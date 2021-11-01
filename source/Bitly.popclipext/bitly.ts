/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios'
import { client } from './client.json'
import { replaceRangesAsync } from './@popclip/replace'

// bitly api endpoint
const bitly = axios.create({ baseURL: 'https://api-ssl.bitly.com/', headers: { Accept: 'application/json' } })

// asynchronous generator which yields the shortened form of all the supplied urls
async function * shorten (urls: Iterable<string>): AsyncIterable<string> {
  const headers = { Authorization: `Bearer ${popclip.options.authsecret}` }
  const table = new Map()
  const deduped = new Set(urls) // exclude any duplicate URLs

  // issue all the API calls, saving the results in the table
  await Promise.all(Array.from(deduped, async (long_url) => {
    table.set(long_url, await bitly.post('v4/shorten', { long_url }, { headers }))
  }))

  // yield the shortened form of each url in the text
  for (const url of urls) {
    yield table.get(url).data.link
  }
}

// replace all matched urls with their shortened equivalents, calling duplicates only once
export const action: Action = async (input) => {
  return await replaceRangesAsync(input.text, input.data.urls.ranges, shorten(input.data.urls))
}

// sign in to bitly using authorization flow
export const auth: AuthFunction = async (info, flow) => {
  const redirect_uri = info.redirect
  const { client_id, client_secret } = util.clarify(client)
  const { code } = await flow('https://bitly.com/oauth/authorize', { client_id, redirect_uri })
  const data = util.buildQuery({ client_id, client_secret, redirect_uri, code })
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
  const response = await bitly.post('oauth/access_token', data, { headers })
  return (response.data as any).access_token
}
