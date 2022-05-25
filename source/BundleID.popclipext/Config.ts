const actions: PopulationFunction = () => {
  if (popclip.context.appIdentifier.length > 0) {
    return [{
      title: popclip.context.appIdentifier,
      code () {
        popclip.copyText(popclip.context.appIdentifier)
        return null
      }
    }]
  } else {
    return null
  }
}
export default { actions }
