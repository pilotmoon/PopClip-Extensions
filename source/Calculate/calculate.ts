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
  let result = evaluate(text)
  if (result === undefined || typeof result === 'function' || typeof result === 'string') {
    return
  }
  if (typeOf(result) === 'ResultSet') {
    const resultArray = result.valueOf()
    result = resultArray[resultArray.length - 1] // take final entry of resultset
  }
  let resultString = format(result, { notation: 'fixed' })
  const maxLength = 40
  if (resultString.length > maxLength) {
    resultString = resultString.substring(0, maxLength) + '…'
  }
  return {
    title: resultString,
    icon: null,
    code: () => endsWithEquals ? selection.text + resultString : resultString
  }
}
