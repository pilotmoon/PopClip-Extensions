// taken from https://github.com/rocktimsaikia/rot13-cipher/blob/master/src/index.js
const rot13Cipher = string => {
	return string.replace(/[a-z]/gi, x => {
		return String.fromCharCode(x.charCodeAt(0) + (x.toLowerCase() <= 'm' ? 13 : -13));
	});
};
exports.action = (selection) => { popclip.pasteText(rot13Cipher(selection.text)); };