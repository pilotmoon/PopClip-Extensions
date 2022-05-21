// Utility for rendering HTML as ENML (Evernote Markup Language),
// Evernote's rather fussy markup language for notes. It's XHTML (not HTML)
// with a couple of extra tags and a restriction on which tags can attributes can be used.
// The allowed list of tags and attributes  is given in enml.json.
// https://dev.evernote.com/doc/articles/enml.php
import sanitizeHtml from 'sanitize-html'
import htmlparser2 from 'htmlparser2'
import render from 'dom-serializer'
import { allowedTags, allowedAttributes } from './enml.json'

// clean HTML by removing disallowed tags and attributes
export const cleanHtml = (dirty: string): string => {
  return sanitizeHtml(dirty, {
    allowedTags: allowedTags,
    allowedAttributes: allowedAttributes,
    exclusiveFilter: function (frame) {
      return frame.tag === 'a' && frame.text.trim().length === 0 // also remove empty links (usually anchors)
    }
  })
}
// render given HTML string as XHTML
export const renderXhtml = (html: string): string => {
  const document = htmlparser2.parseDocument(html)
  return render(document, { xmlMode: true })
}
// render given HTML string as ENML
export const renderEnml = (html: string): string => {
  const prefix = '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">\n<en-note>'
  const suffix = '</en-note>'
  return prefix + renderXhtml(cleanHtml(html)) + suffix
}
