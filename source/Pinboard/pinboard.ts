/**
 * PopClip Extension for Pinboard
 * API docs: https://pinboard.in/api/
 */
import axios from 'axios'
const p = axios.create({ baseURL: 'https://api.pinboard.in/v1/', params: { format: 'json' } })

// add url to pinboard
// uses page title as description if page url matches selected url
export const action: ActionFunction = async (selection, options, context) => {
  const token = `${options.username as string}:${options.authsecret}`
  const url = selection.data.urls[0]
  const description = context.browserUrl === url ? context.browserTitle : ''
  await p.get('posts/add', { params: { url, description, auth_token: token } })
}

// retreive user's api token using basic http authentication
export const auth: AuthFunction = async (info) => {
  return (await p.get('user/api_token', { auth: info }) as any).data.result
}

// options
export const options: Option[] = [
  { identifier: 'username', type: 'string', label: util.localize('Username') },
  { identifier: 'password', type: 'password', label: util.localize('Password') }
]
