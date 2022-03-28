// Utility for rendering HTML as XHTML or ENML
// https://dev.evernote.com/doc/articles/creating_notes.php
import sanitizeHtml = require ('sanitize-html')
import htmlparser2 = require('htmlparser2')
import render = require('./dom-serializer')
import { allowedTags } from './enml.json'

// clean HTML suitable for use as ENML
export const cleanHtml = (dirty: string): string => {
  return sanitizeHtml(dirty, {
    allowedTags: allowedTags,
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      img: ['src', 'alt', 'title', 'width', 'height']
    },
    exclusiveFilter: function (frame) {
      return frame.tag === 'a' && frame.text.trim().length === 0 // remove empty links (often anchors)
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
