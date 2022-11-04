/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios'
import { client } from './client.json'

// Todoist REST API v2 root
const todoist = axios.create({ baseURL: 'https://api.todoist.com/rest/v2/' })

// add task to todoist
export const action: Action = async (input) => {
  const headers = { Authorization: `Bearer ${popclip.options.authsecret}` }
  await todoist.post('tasks', { content: input.text }, { headers })
  return null
}

// sign in to todoist
export const auth: AuthFunction = async (info, flow) => {
  const { client_id, client_secret } = util.clarify(client)
  const { code } = await flow('https://todoist.com/oauth/authorize', { client_id, scope: 'data:read_write' })
  const response = await axios.post('https://todoist.com/oauth/access_token', { client_id, client_secret, code })
  return response.data.access_token
}
