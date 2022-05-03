import axios from '@popclip/axios'
const readwise = axios.create({ baseURL: 'https://readwise.io/api/v2/' })

export const action: Action = async (input, options, context) => {
  const payload: any = { text: input.text }
  if (context.browserUrl.length > 0) { payload.source_url = context.browserUrl }
  if (context.browserTitle.length > 0) { payload.title = context.browserTitle }
  await readwise.post('highlights/', { highlights: [payload] }, { headers: { Authorization: `Token ${options.authsecret}` } })
}

export const auth: AuthFunction = async (info) => {
  const response = await readwise.get('auth/', { headers: { Authorization: `Token ${info.password}` } })
  if (response.status !== 204) { throw new Error('Not logged in') }
  return info.password
}
