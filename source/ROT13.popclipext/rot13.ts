// taken from https://github.com/rocktimsaikia/rot13-cipher/blob/master/src/index.js
import rot13Cipher from 'rot13-cipher'
const action: ActionFunction = (selection) => rot13Cipher(selection.text)
action.after = 'paste-result'
export default { action }
