/* eslint-disable @typescript-eslint/naming-convention */
// reimplementation of Bitly ext (as callback auth test)
import axios from 'axios'
import { client } from './client.json'
import { replaceRangesAsync } from './@popclip/replace'

const bitly = axios.create({ baseURL: 'https://api-ssl.bitly.com/', headers: { Accept: 'application/json' } })

// shorten urls sequentially from the input array of long urls
// async function * shorten (urls: Iterable<string>): AsyncIterable<string> {
//   const headers = { Authorization: `Bearer ${popclip.options.authsecret}` }
//   for (const long_url of urls) {
//     const response = await bitly.post('v4/shorten', { long_url }, { headers })
//     yield (response.data as any).link
//   }
// }

// alternate generator that does all the API calls simultanously and skips dupes
async function * shortenSimultaneously (urls: Iterable<string>): AsyncIterable<string> {
  const headers = { Authorization: `Bearer ${popclip.options.authsecret}` }
  const lookup = new Map<string, string>()
  await Promise.all(Array.from(new Set(urls), async (long_url) => {
    const response = await bitly.post('v4/shorten', { long_url }, { headers })
    lookup.set(long_url, (response.data as any).link)
  }))
  for (const url of urls) {
    yield lookup.get(url) as string
  }
}

// replace all matched urls with their shortened equivalents, calling duplicates only once
export const action: Action = async (input) => {
  return await replaceRangesAsync(input.text, input.data.urls.ranges, shortenSimultaneously(input.data.urls))
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
