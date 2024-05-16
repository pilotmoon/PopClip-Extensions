// #popclip
// name: IINA
// identifier: com.pilotmoon.popclip.extension.iina
// description: Open the selected URL in IINA.
// icon: symbol:film
// requirements: [url]
// app: { name: IINA, bundleIdentifier: com.colliderli.iina, link: https://iina.io/, checkInstalled: true }
// language: javascript
popclip.openUrl(popclip.input.data.urls[0], { app: "com.colliderli.iina" });
