import axios from 'axios'
import CryptoJS from 'crypto-js'
import { replaceRangesAsync } from '@popclip/helpers/replace-ranges'
import { concurrentTransform } from '@popclip/helpers/generator'
import { access } from './access.json'

const droplr = axios.create({
  baseURL: 'https://api.droplr.com',
  headers: { 'User-Agent': 'com.pilotmoon.popclip.extension.droplr/2' }
})

/*
Droplr has its own custom authentication formula.
http://droplr.github.io/docs/#authentication-formula
*/
async function droplrRequest (action: string, method: 'GET'|'POST', passwordHash: string, userEmail: string, contentType: string = '', data: string = ''): Promise<unknown> {
  const { puk, prk } = util.clarify(access)
  const epochMilliseconds = new Date().getTime()
  const pub = util.base64Encode(`${puk as string}:${userEmail}`)
  const sig = CryptoJS.HmacSHA1(
    `${method} ${action} HTTP/1.1\n${contentType}\n${epochMilliseconds}`,
    `${prk as string}:${passwordHash}`
  ).toString(CryptoJS.enc.Base64)
  const response = await droplr({
    method: method,
    url: action,
    data: data,
    headers: {
      Authorization: `droplr ${pub}:${sig}`,
      'Content-Type': contentType,
      Date: epochMilliseconds
    }
  })
  return response.data
}

// doesn't actually work? I think droplr may have disable the shortening feature at least for new accounts
async function shorten (url: string): Promise<string> {
  const { passwordHash, userEmail } = JSON.parse(popclip.options.authsecret)
  return await droplrRequest('/links', 'POST', passwordHash, userEmail, 'text/plain', url) as string
}

export const action: Action = async (input) => {
  return await replaceRangesAsync(input.text, input.data.urls.ranges, concurrentTransform(input.data.urls, shorten))
}

export const auth: AuthFunction = async (info) => {
  const passwordHash = CryptoJS.SHA1(info.password).toString(CryptoJS.enc.Hex)
  const userEmail = info.username
  // retrieve the 'account' endpoint to prove we can login
  await droplrRequest('/account', 'GET', passwordHash, userEmail, '')
  // these are the value we need later
  return JSON.stringify({ passwordHash, userEmail })
}

// options
export const options: Option[] = [
  { identifier: 'username', type: 'string', label: util.localize('Username') },
  { identifier: 'password', type: 'password', label: util.localize('Password') }
]
