import linkedom from 'linkedom'
import TurndownService from 'turndown'
import turndownPluginGfm from './@joplin+turndown-plugin-gfm'

export function htmlToMarkdown (html: string): string {
  // generate DOM object from HTML
  function JSDOM (html: any): any { return linkedom.parseHTML(html) } // facade to work like jsdom
  const { document } = new (JSDOM as any)(html)
  const turndownService = new TurndownService({ headingStyle: 'atx' })
  turndownService.use(turndownPluginGfm.gfm)
  return turndownService.turndown(document)
}

export const action: Action = (input) => {
  return htmlToMarkdown(input.html)
}
