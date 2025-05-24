// run with node list.js
const langs = require('./langs.json')
for (const [key, value] of Object.entries(langs.translation)) {
  console.log(`${value.nativeName} (${value.name})`)
}