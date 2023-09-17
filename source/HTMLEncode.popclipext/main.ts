// some info about HTML entities https://developer.mozilla.org/en-US/docs/Glossary/Entity
// npm page for html-entities library https://www.npmjs.com/package/html-entities
import entities = require('html-entities')
const extension: Extension = {
  options: [{
    identifier: 'mode',
    label: 'Encoding Mode',
    type: 'multiple',
    values: ['specialChars', 'nonAsciiPrintable'],
    valueLabels: ["HTML special characters only (<>&\"')", 'All non-ASCII characters']
  }],
  actions: [{
    icon: '[&;]',
    title: 'HTML-encode',
    code: (selection, options) => {
      popclip.pasteText(entities.encode(selection.text, { mode: options.mode as entities.EncodeMode }))
    }
  }, {
    icon: '[[&;]]',
    title: 'HTML-decode',
    regex: /&(\w+|#\d+);/,
    code: (selection) => {
      popclip.pasteText(entities.decode(selection.text))
    }
  }]
}
export default extension
