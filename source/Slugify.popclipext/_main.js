const slug=require('voca/slugify');  
module.exports = function (selection) {      
    popclip.pasteText(slug(selection.text, true));
}
