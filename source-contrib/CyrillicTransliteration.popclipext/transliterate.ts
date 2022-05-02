import { lower, upper } from './table.json'
const lowerMap = new Map(Object.entries(lower))
const upperMap = new Map(Object.entries(upper))

function choose (from: string | string[], cNext: string): string {
  if (typeof from === 'string') {
    return from
  } else if (lowerMap.has(cNext)) {
    return from[1]
  } else {
    return from[0]
  }
}

function t (c: string, cNext: string): string {
  if (lowerMap.has(c)) {
    return lowerMap.get(c) as string
  } else if (upperMap.has(c)) {
    return choose(upperMap.get(c) as string, cNext)
  } else {
    return c
  }
}

export function transliterate (input): string {
  // split into array of characters
  let result: string = ''
  for (let i = 0; i < input.length; i += 1) {
    result += t(input[i], input[i + 1])
  }
  return result
}

export const action: ActionFunction = (input) => {
  return transliterate(popclip.input.text)
}
