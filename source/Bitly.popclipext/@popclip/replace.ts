/**
 * Utility module for ranged text replacement.
 * @module replace
 */

/**
 * A generator which yields the secions of a string *not* contained within the given ranges.
 * @param text The string to divide up.
 * @param ranges Array of ranges. Must all be contained within the `text`, in ascending order, and non-overlapping.
 * @returns A generator which will yield the `ranges.length + 1` sections of text before, in between and after the given ranges.
/**
 */
function * textBetweenRanges (text: string, ranges: Range[]): Generator<string> {
  let pos = 0
  for (const range of ranges) {
    yield text.substring(pos, range.location)
    pos = range.location + range.length
  }
  yield text.substring(pos, text.length)
}

/** Asynchronous version of `replaceRanges`. */
export const replaceRangesAsync = async (text: string, ranges: Range[], replacements: AsyncIterable<string>): Promise<string> => {
  const between = textBetweenRanges(text, ranges)
  let result = between.next().value as string
  for await (const item of replacements) {
    result += item + (between.next().value as string)
  }
  return result
}

/** Replace sections in a string with given replacements
 * @param text String on which to perform the operation.
 * @param ranges Array of ranges in to replace. Must all be contained within the `text`, in ascending order, and non-overlapping.
 * @param replacements The replacement values, corresponding to `ranges`.
 * @return The modified string.
 */
export const replaceRanges = (text: string, ranges: Range[], replacements: Iterable<string>): string => {
  const between = textBetweenRanges(text, ranges)
  let result = between.next().value as string
  for (const item of replacements) {
    result += item + (between.next().value as string)
  }
  return result
}
