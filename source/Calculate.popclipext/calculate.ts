import { evaluate, format, typeOf } from 'mathjs'
export const actions: PopulationFunction = (selection) => {
  print('calculate actions')
  if (selection.text.length > 1000) { // limit input size
    return
  }
  let text = selection.text.trim()
  const endsWithEquals = text.endsWith('=')
  if (endsWithEquals) {
    text = text.substring(0, text.length - 1)
  }
  // first try simplifying
  let result = evaluate(text)
  if (result === undefined || typeof result === 'function') {
    return
  }
  if (typeOf(result) === 'ResultSet') {
    const resultArray = result.valueOf()
    result = resultArray[resultArray.length - 1] // take final entry of resultset
  }
  const resultString = format(result, { notation: 'fixed' })
  return {
    title: resultString,
    icon: null,
    code: () => endsWithEquals ? selection.text + resultString : resultString
  }
}
