/**
 * Utility module for ranged text replacement.
 * @module replace
 */

// generator: yield the `ranges.length + 1` sections of text before, in between and after the given ranges
function * textBetweenRanges (text: string, ranges: Range[]): Generator<string> {
  let pos = 0
  for (const range of ranges) {
    yield text.substring(pos, range.location)
    pos = range.location + range.length
  }
  yield text.substring(pos, text.length)
}

// replace sections in a string with given replacements
export const replaceRangesAsync = async (text: string, ranges: Range[], replacements: AsyncIterable<string>): Promise<string> => {
  const between = textBetweenRanges(text, ranges)
  let result = between.next().value as string
  for await (const item of replacements) {
    result += item + (between.next().value as string)
  }
  return result
}
