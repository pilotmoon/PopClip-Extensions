/* eslint-disable @typescript-eslint/naming-convention */
import { access } from './access.json'
import axios from 'axios'
import { markdownToBlocks } from '@tryfabric/martian'

// Notion api root
const notion = axios.create({ baseURL: 'https://api.notion.com/v1/' })

/*
 Implement authorization flow described in docs:
 https://developers.notion.com/docs/authorization
 */
const auth: AuthFunction = async (info, flow) => {
  const { client_id, client_secret } = util.clarify(access)
  const redirect_uri = info.redirect
  const { code } = await flow(notion.defaults.baseURL as string + 'oauth/authorize', {
    client_id, redirect_uri, response_type: 'code', owner: 'user'
  }, ['code'])
  const response = await notion.post('oauth/token',
    { grant_type: 'authorization_code', code, redirect_uri },
    { auth: { username: client_id, password: client_secret } }
  )
  return JSON.stringify(response.data)
}

const action: ActionFunction = async (input, options, context) => {
  // set up for calling api
  const auth = JSON.parse(options.authsecret)
  notion.defaults.headers.common.Authorization = `Bearer ${auth.access_token as string}`
  notion.defaults.headers.common['Notion-Version'] = '2022-06-28'

  const pageName = options.page
  if (typeof pageName !== 'string' || pageName.length < 1) {
    throw new Error('empty page name specified')
  }

  // search for our page
  let pageId = ''
  const response = await notion.post('search', { query: pageName, filter: { value: 'page', property: 'object' } })
  const pages: Array<{object: string, id: string, properties: {title: {title: Array<{plain_text: string}>}}}> = response.data.results
  if (response.data.object === 'list') {
    for (const page of pages) {
      const foundPageName = page.properties.title.title[0].plain_text
      print('foundPageName', foundPageName, pageName)
      if (foundPageName === pageName) {
        pageId = page.id
        print('found', pageId)
      }
    }
  }
  if (pageId === '') {
    throw new Error('could not get a page to add to')
  }

  // append source reference to clipped markdown
  const markdown = popclip.input.markdown + `\n\n— *${makeReference(popclip.context)}* (${timeStamp()})`
  // convert in to Notion block format
  const blocks = markdownToBlocks(markdown)
  await notion.patch(`blocks/${pageId}/children`, {
    children: blocks
  })
  popclip.showSuccess()
  return null
}

// a markdown fragment to represent the clip's source
function makeReference (context: Context): string {
  let ref = context.appName.length > 0 ? context.appName : 'unknown source'
  if (context.browserUrl.length > 0) {
    ref = `[${context.browserTitle.length > 0 ? context.browserTitle : context.browserUrl}](${context.browserUrl})`
  }
  return ref
}

// current date & time in current locale's format
function timeStamp (): string {
  return new Intl.DateTimeFormat([], { dateStyle: 'medium', timeStyle: 'medium' }).format(new Date())
}

export default { auth, action }
