export const actions: PopulationFunction = (selection) => {
  const lineCount = selection.text.split(/\r\n|\r|\n/).length
  const action: Action = {
    title: util.localize(lineCount.toString() + ' ' + util.localize(lineCount > 1 ? 'Lines' : 'Line'))
  }
  return action
}
