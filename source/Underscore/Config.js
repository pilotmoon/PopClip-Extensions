define({
    action: (selection) => popclip.pasteText(require('replace-spaces.js')(selection.text, '_'))
});
