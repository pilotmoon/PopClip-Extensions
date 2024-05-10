const voca = require("voca");
const action = (selection) => {
    popclip.pasteText(voca.slugify(selection.text));
};
exports.action = action;
