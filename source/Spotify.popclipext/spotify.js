// clean up the text
const term = popclip.input.text.trim().split(/\s+/).join(' ')
// call the url
popclip.openUrl('spotify:search:' + encodeURIComponent(term))