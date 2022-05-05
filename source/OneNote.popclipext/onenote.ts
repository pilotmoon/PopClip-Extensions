/* eslint-disable @typescript-eslint/naming-convention */
import { client_id } from './client.json'
import axios from '@popclip/axios'

const login_uri = 'https://login.microsoftonline.com/common/oauth2/v2.0'
const oauth_endpoint = axios.create({ baseURL: login_uri })
const scope = 'Notes.Create offline_access'

export const auth: AuthFunction = async (info, flow) => {
  // get authorization code
  const redirect_uri = info.redirect
  const { code } = await flow(login_uri + '/authorize', { client_id, redirect_uri, scope, response_mode: 'query', response_type: 'code' })

  // get refresh token
  const response = await oauth_endpoint.post('token', util.buildQuery(
    { client_id, redirect_uri, scope, code, grant_type: 'authorization_code' }
  ))
  return response.data.refresh_token
}

const refresh_access = async (refresh_token: string): Promise<string> => {
  print('refreshing access token')
  const response = await oauth_endpoint.post('token', util.buildQuery(
    { client_id, refresh_token, grant_type: 'refresh_token' }
  ))
  return response.data.access_token
}

// actually post the content
export const action: ActionFunction = async (input, options, context) => {
  const access_token = await refresh_access(options.authsecret)
  print('got access token', access_token)
  const onenote_endpoint = axios.create({
    baseURL: 'https://graph.microsoft.com/v1.0/me/onenote',
    headers: { Authorization: `Bearer ${access_token}` }
  })

  let content = input.html
  if (context.browserUrl.length > 0 && context.browserTitle.length > 0) {
    content = content + `<p>Clipped from: <a href="${context.browserUrl}">${context.browserTitle}</a></p>`
  }
  await onenote_endpoint.post('pages', content, { headers: { 'Content-Type': 'text/html' } })
}
