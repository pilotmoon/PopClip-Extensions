const pydic = require('./pydic.json').pydic;
function trans (text) {
  let str = ''
  let cat
  for (let i = 0; i < text.length; i++) {
    if (pydic.indexOf(text.charAt(i)) != -1 && text.charCodeAt(i) > 200) {
      cat = 1
      while (pydic.charAt(pydic.indexOf(text.charAt(i)) + cat) != ',') {
        str += pydic.charAt(pydic.indexOf(text.charAt(i)) + cat)
        cat++
      }
      str += ' '
    } else {
      str += text.charAt(i)
    }
  }
  return str
}
exports.action = () => {
  return trans(popclip.input.text)
} 
