const memory: string[] = []
export const actions: PopulationFunction = (selection) => {
  memory.push(selection.text)
  print('in populator with ' + memory.join(','))
  return () => {
    print('dynamic hello')
    return null
  }
}
