import { slugify } from 'voca'
const action: ActionFunction = (selection) => {
  popclip.pasteText(slugify(selection.text))
}
exports.action = action
