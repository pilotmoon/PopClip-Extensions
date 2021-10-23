// reimplementation of Bitly ext (as callback auth test)
import axios from 'axios'
import { client } from './client.json'
const bitly = axios.create({ baseURL: 'https://api-ssl.bitly.com/' })
const { key, secret } = JSON.parse(util.base64Decode(client))

// add url to bitly
export const action: ActionFunction = async (selection, context, options) => {
  // const url = selection.data.webUrls[0]
  // const description = context.browserUrl === url ? context.browserTitle : ''
  // const token = `${options.username as string}:${options.authsecret as string}`
  // await pinboard.get('posts/add', { params: { url, description, auth_token: token } })
  // popclip.showSuccess()
}

// sign in using authorization flow
export const auth: AuthFunction = async (info, flow) => {
  const access = await flow('https://bitly.com/oauth/authorize', {
    client_id: key, redirect_uri: util.authRedirectUrl(['code']), nullish: undefined
  })
  print('callbackData', access)
  return 'hi hi hi'
}
