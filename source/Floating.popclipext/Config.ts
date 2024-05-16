// #popclip
// name: Floating
// identifier: com.pilotmoon.popclip.extension.floating
// description: Open the selected URL in Floating.
// icon: symbol:pip
// requirements: [url]
// app: { name: Floating, bundleIdentifier: com.pranapps.Floating, link: https://apps.apple.com/app/floating-picture-in-picture/id1508833245?mt=12, checkInstalled: true }
// popclip version: 4151
// language: javascript
popclip.openUrl("floating:?url=" + popclip.input.data.urls[0]);
