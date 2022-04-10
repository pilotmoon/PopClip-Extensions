import utils = require('../../lib/pcx-utils')
define(() => {
  const extension: Extension = {
    actions: (selection) => {
      const result = utils.preserveEndSpace(selection.text, (text) => utils.replaceSpaces(text, '-'))
      if (result !== selection.text) {
        return () => popclip.pasteText(result)
      }
    }
  }
  return extension
})
