import { lower, upper } from './table.json'

function choose (from: any, cNext: string): string {
  if (typeof from === 'string') {
    return from
  } else {
    return (cNext in lower) ? from[1] : from[0]
  }
}

function t (c: string, cNext: string): string {
  if (c in lower) {
    return lower[c]
  } else if (c in upper) {
    return choose(upper[c], cNext)
  } else {
    return c
  }
}

export function transliterate (input): string {
  // split into array of characters
  let result: string = ''
  // special case of empty string
  if (input.length > 0) {
    // loop up to last but one character
    for (let i = 0; i < input.length - 1; i += 1) {
      result += t(input[i], input[i + 1])
    }
    // finish with last character
    result += t(input[input.length - 1], '')
  }
  return result
}

export const action: ActionFunction = (input) => {
  return transliterate(popclip.input.text)
}
