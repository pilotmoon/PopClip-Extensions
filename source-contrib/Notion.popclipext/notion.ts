/* eslint-disable @typescript-eslint/naming-convention */
import { access } from './access.json'
import axios from 'axios'

// notion api root
const notion = axios.create({ baseURL: 'https://api.notion.com/v1/' })

const auth: AuthFunction = async (info, flow) => {
  const { client_id, client_secret } = util.clarify(access)
  const redirect_uri = 'https://pilotmoon.com/popclip_extension_callback?callback_ext_id=com.pilotmoon.popclip.extension.notion&callback_ext_name=Notion&callback_expect=eyJxIjpbImNvZGUiXX0'
  const { code } = await flow(notion.defaults.baseURL as string + 'oauth/authorize', {
    client_id, redirect_uri, response_type: 'code', owner: 'user'
  })
  const response = await notion.post('oauth/token', {
    auth: { username: client_id, password: client_secret },
    body: { grant_type: 'authorization_code', code, redirect_uri }
  })
  return response.data
}

const action: ActionFunction = async (input, option, context) => {
  return null
}

export default { auth, action }
