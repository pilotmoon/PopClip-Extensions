import linkedom = require('@popclip/linkedom')
import TurndownService = require('@popclip/turndown')
import turndownPluginGfm = require('./@joplin+turndown-plugin-gfm')

export function htmlToMarkdown (html: string): string {
  // generate DOM object from HTML
  function JSDOM (html): any { return linkedom.parseHTML(html) } // facade to work like jsdom
  const { document } = new (JSDOM as any)(html)
  const options = { headingStyle: 'atx' }
  var turndownService = new TurndownService(options)
  turndownService.use(turndownPluginGfm.gfm)
  return turndownService.turndown(document)
}

export const action: Action = (input) => {
  return htmlToMarkdown(input.html)
}
