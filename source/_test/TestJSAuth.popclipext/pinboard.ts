// reimplementation of Pinboard ext (as basic test)
import axios from 'axios'

// options
const options: Option[] = [
  { identifier: 'username', type: 'string', label: util.localize('Username') },
  { identifier: 'password', type: 'password', label: util.localize('Password') }
]

// docs: https://pinboard.in/api/
//       https://axios-http.com/docs/req_config
const pinboard = axios.create({ baseURL: 'https://api.pinboard.in/v1/', params: { format: 'json' } })

// log in to pinboard
const pinboardAuth: AuthFuncton = async (info) => {
  const response = await pinboard.get('user/api_token', {
    auth: { username: info.username, password: info.password }
  })
  return (response.data as any).result
}

// add url to pinboard
const pinboardAdd: ActionFunction = async (selection, context, options) => {
  print('options', options)
  const url = selection.data.webUrls[0]
  // use page title as description if page url matches selected url
  const description = context.browserUrl === url ? context.browserTitle : undefined
  await pinboard.get('posts/add', {
    params: { url, description, auth_token: options.authsecret }
  })
}

defineExtension({ options, auth: pinboardAuth, action: pinboardAdd })
