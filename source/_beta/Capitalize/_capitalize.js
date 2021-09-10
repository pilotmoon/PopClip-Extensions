module.exports = function (selection) {
    const cap=require('voca/capitalize');    
    popclip.pasteText(cap(selection.text, true));
}
