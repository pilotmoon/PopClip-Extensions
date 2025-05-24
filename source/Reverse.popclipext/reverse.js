const lines = popclip.input.text.match(/[^\r\n]+/g)
lines.reverse()
popclip.pasteText(lines.join('\n'))
