import axios from 'axios'
const readwise = axios.create({ baseURL: 'https://readwise.io/api/v2/' })
const token = (t: string): string => `Token ${t}`

export const action: Action = async (input, options, context) => {
  const payload: any = { text: input.text }
  if (context.browserUrl.length > 0) {
    payload.source_url = context.browserUrl
  }
  if (context.browserTitle.length > 0) {
    payload.title = context.browserTitle
  }
  const response = await readwise.post('highlights/', { highlights: [payload] }, { headers: { Authorization: token(options.authsecret) } })
  print(response)
}

export const auth: AuthFunction = async (info) => {
  print('pw', info.password)
  const response = await readwise.get('auth/', { headers: { Authorization: token(info.password) } })
  if (response.status !== 204) {
    throw new Error('Not logged in')
  }
  return info.password
}
