// #popclip
// name: Bundle ID
// identifier: com.pilotmoon.popclip.extension.bundleid
// description: Show the bundle identifier of the app.
// entitlements: [dynamic]
// requirements: []
// popclipVersion: 4225
// module: true
// language: typescript

export const actions: PopulationFunction = () => {
  if (popclip.context.appIdentifier.length > 0) {
    return [{
      title: popclip.context.appIdentifier,
      code () {
        popclip.copyText(popclip.context.appIdentifier)
      }
    }]
  }
}
