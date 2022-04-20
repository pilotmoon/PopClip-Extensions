// run with node list.js
// To fetch latest: `curl https://api.cognitive.microsofttranslator.com/languages\?api-version\=3.0\&scope\=translation > langs.json`
const langs = require('./langs.json')
for (const [key, value] of Object.entries(langs.translation)) {
  console.log(`${value.nativeName} (${value.name})`)
}