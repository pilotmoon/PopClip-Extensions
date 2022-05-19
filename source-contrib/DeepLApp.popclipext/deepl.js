"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.action = void 0;
async function appTranslate(combo) {
    if (combo.length === 0) {
        popclip.pressKey('command C');
        await sleep(100);
        popclip.pressKey('command C');
    }
    else {
        popclip.pressKey(combo);
    }
}
// our action
exports.action = {
    app: { bundleIdentifiers: ['com.linguee.DeepLCopyTranslator'], checkInstalled: true, name: 'DeepL', link: 'https://www.deepl.com/app/' },
    code: async (_, options) => {
        await appTranslate(options.combo);
        return null;
    }
};
// the dynamically generated extension options
exports.options = (() => {
    const comboOption = {
        identifier: 'combo',
        label: 'DeepL Shortcut',
        type: 'string',
        description: "Leave this blank to use '⌘+C+C', the default. Or type a shortcut like 'control option command D', if you have set custom DeepL preferences."
    };
    return [comboOption];
})();
