/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios'
import { client } from './client.json'

// add task to todoist
export const action: Action = async (input) => {
  const headers = { Authorization: `Bearer ${popclip.options.authsecret}` }
  await axios.post('https://api.todoist.com/rest/v1/tasks', { content: input.text }, { headers })
  return null
}
// note: endpoint https://todoist.com/api/v8/items/add also works with only task:add scope
// but this is old API which may be deprecated (Todoist has been several times terminated old APIs in the past)

// sign in to todoist
export const auth: AuthFunction = async (info, flow) => {
  const { client_id, client_secret } = util.clarify(client)
  const { code } = await flow('https://todoist.com/oauth/authorize', { client_id, scope: 'data:read_write' })
  const response = await axios.post('https://todoist.com/oauth/access_token', { client_id, client_secret, code })
  return response.data.access_token
}
