import axios from 'axios'
import CryptoJS from 'crypto-js'
import { replaceRangesAsync } from '@popclip/helpers/replace-ranges'
import { concurrentTransform } from '@popclip/helpers/generator'
import { access } from './access.json'

/*
Droplr has its own custom authentication formula.
http://droplr.github.io/docs/#authentication-formula
*/
async function droplrRequest (action: string, method: 'GET'|'POST', passwordHash: string, userEmail: string, contentType: string = '', data: string = ''): Promise<any> {
  const { puk, prk } = util.clarify(access)
  const epochMilliseconds = new Date().getTime()
  const pub = util.base64Encode(`${puk as string}:${userEmail}`)
  const sig = CryptoJS.HmacSHA1(
    `${method} ${action} HTTP/1.1\n${contentType}\n${epochMilliseconds}`,
    `${prk as string}:${passwordHash}`
  ).toString(CryptoJS.enc.Base64)
  const response = await axios({
    baseURL: 'https://api.droplr.com',
    method: method,
    url: action,
    data: data,
    headers: {
      Authorization: `droplr ${pub}:${sig}`,
      'User-Agent': 'com.pilotmoon.popclip.extension.droplr/2',
      'Content-Type': contentType,
      Date: epochMilliseconds
    }
  })
  return response.data
}

/* Read stored credentials either from old extension or this extensions. */
function credentials (): { passwordHash: string, userEmail: string } {
  const result = { passwordHash: '', userEmail: '' }
  let credentials: any = {}
  try {
    // this version uses plain JSON
    credentials = JSON.parse(popclip.options.authsecret)
  } catch (err) {
    try {
      // old extension used base64-encoded query
      credentials = util.parseQuery(util.base64Decode(popclip.options.authsecret))
    } catch (err) {
      // fall through
      print('Neither type of credentials found')
    }
  }

  if (typeof credentials.passwordHash === 'string' && typeof credentials.userEmail === 'string') {
    // new style credentials
    result.passwordHash = credentials.passwordHash
    result.userEmail = credentials.userEmail
  } else if (typeof credentials.passHash === 'string' && typeof credentials.userEmail === 'string') {
    // old style credentials
    result.passwordHash = credentials.passHash
    result.userEmail = credentials.userEmail
  } else {
    throw new Error('Not signed in')
  }
  return result
}

async function shorten (url: string): Promise<string> {
  const { passwordHash, userEmail } = credentials()
  const data = await droplrRequest('/links', 'POST', passwordHash, userEmail, 'text/plain', url)
  const { shortlink, privacy, password } = data as {shortlink: string, privacy: 'PUBLIC'|'PRIVATE'|'OBSCURE', password: string}
  return shortlink + (privacy === 'PRIVATE' ? '/' + password : '')
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
  { identifier: 'password', type: 'password', label: util.localize('Password'), description: 'Note: this extension requires a Droplr Enterprise account.' }
]
