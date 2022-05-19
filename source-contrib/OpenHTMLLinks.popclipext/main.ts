/**
 * "Open HTML Links" extension for PopClip
 * @author Nick Moore
 * @module OpenHTMLLinks
 */
import { extractLinks } from './extractLinks'

defineExtension({
  action (selection) {
    /* Note that selection.html is not available until we are inside the action function.
       So we can't filter the action availability by the presence of a link. */
    const links = extractLinks(selection.html)
    if (links.length > 0) {
      links.forEach(link => {
        popclip.openUrl(link)
      })
    }
    return null
  },
  captureHtml: true
})
