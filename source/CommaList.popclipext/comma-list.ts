export const actions: PopulationFunction = (selection) => {
  // split input into lines and filter blank lines
  const inputLines: string[] = selection.text.split(/\r\n|\r|\n/).map(str => str.trim()).filter(str => str.length > 0)
  // if one
  if (inputLines.length > 1) {
    const action: Action = {
      title: 'Join with commas',
      code () {
        popclip.pasteText(inputLines.join(', '))
      }
    }
    return action
  } else {
    // split on commas and filter again
    const outputLines = inputLines[0].split(',').map(str => str.trim()).filter(str => str.length > 0)
    if (outputLines.length > 1) {
      const action: Action = {
        title: 'Split into lines',
        code () {
          popclip.pasteText(outputLines.join('\r'))
        }
      }
      return action
    }
  }
}
