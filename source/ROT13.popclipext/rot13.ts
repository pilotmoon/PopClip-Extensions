import rot13Cipher from 'rot13-cipher';
const action: ActionFunction = (selection) => rot13Cipher(selection.text);
export default { action, after: 'paste-result' }
