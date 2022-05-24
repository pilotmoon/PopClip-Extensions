/* eslint-disable @typescript-eslint/naming-convention */
import { access } from './access.json'
import { z } from 'zod'
import axios from 'axios'

// slack api base
const slack = axios.create({ baseURL: 'https://slack.com/api/' })
// the expected api response
const AccessResponse = z.object({
  access_token: z.string().min(1),
  incoming_webhook: z.object({
    url: z.string().min(1)
  })
})

const auth: AuthFunction = async (info, flow) => {
  const { client_id, client_secret } = util.clarify(access)
  const authorizationUrl = 'https://slack.com/oauth/v2/authorize'
  const { code } = await flow(authorizationUrl, { client_id, scope: 'incoming-webhook' })
  const response = await slack.post('oauth.v2.access', util.buildQuery({ code, client_id, client_secret }))
  return JSON.stringify(AccessResponse.parse(response.data))
}

const action: ActionFunction = async (input, options, context) => {
  const url = AccessResponse.parse(JSON.parse(options.authsecret)).incoming_webhook.url
  const text = slack_escape(popclip.input.text)
  await slack.post(url, { text })
  return null
}

// https://api.slack.com/reference/surfaces/formatting#basics
// escaping as required by slack api
function slack_escape (str: string): string {
  str = str.replace(/&/g, '&amp;')
  str = str.replace(/</g, '&lt;')
  str = str.replace(/>/g, '&gt;')
  return str
}

export default { action, auth }
