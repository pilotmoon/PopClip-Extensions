const lines = popclip.input.text.match(/[^\r\n]+/g)
lines.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
popclip.pasteText(lines.join('\n'))
