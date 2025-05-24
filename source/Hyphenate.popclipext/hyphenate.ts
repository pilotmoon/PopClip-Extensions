import { transformLines } from '@popclip/helpers/transform-lines'
import { replaceSpaces } from '@popclip/helpers/replace-spaces'
export const actions: PopulationFunction = (selection) => {
  const result = transformLines(selection.text, (text) => replaceSpaces(text, '-'))
  if (result !== selection.text) {
    return () => {
      popclip.pasteText(result)
    }
  }
}
