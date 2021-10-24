// reimplementation of Pinboard ext (as basic test)
// docs: https://pinboard.in/api/
//       https://axios-http.com/docs/req_config
import axios from 'axios'
const pinboard = axios.create({ baseURL: 'https://api.pinboard.in/v1/', params: { format: 'json' } })

// add url to pinboard
// uses page title as description if page url matches selected url
export const action: ActionFunction = async (selection, context, options) => {
  const url = selection.data.webUrls[0]
  const description = context.browserUrl === url ? context.browserTitle : ''
  const token = `${options.username as string}:${options.authsecret as string}`
  await pinboard.get('posts/add', { params: { url, description, auth_token: token } })
  popclip.showSuccess()
}

// retreive user's api token using basic http authentication
export const auth: AuthFunction = async (info) => {
  const response = await pinboard.get('user/api_token', { auth: info })
  return (response.data as any).result
}

// options
export const options: Option[] = [
  { identifier: 'username', type: 'string', label: util.localize('Username') },
  { identifier: 'password', type: 'password', label: util.localize('Password') }
]
