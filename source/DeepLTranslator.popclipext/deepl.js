"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.actions = void 0;
// languages list comes from https://api-free.deepl.com/v2/languages
const langs_json_1 = require("./langs.json");
// sort the languages by name
langs_json_1.langs.sort((a, b) => {
    return a.name.localeCompare(b.name);
});
function webTranslate(text, lang) {
    // escape backslash before encoding (DeepL website needs this or it truncates at the slash)
    const escapedText = text.replace(/\//g, '\\/');
    const url = `https://www.deepl.com/translator#auto/${lang}/${encodeURIComponent(escapedText)}`;
    popclip.openUrl(url);
}
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
exports.actions = [{
        requirements: ['text', 'option-mode=web'],
        code: (input, options) => webTranslate(input.text, options.destlang)
    }, {
        requirements: ['text', 'option-mode=app'],
        app: { bundleIdentifiers: ['com.linguee.DeepLCopyTranslator'], checkInstalled: true, name: 'DeepL', link: 'https://www.deepl.com/app/' },
        code: async (_, options) => await appTranslate(options.combo)
    }];
// the dynamically generated extension options
exports.options = (() => {
    const modeOption = {
        identifier: 'mode',
        label: 'Mode',
        type: 'multiple',
        valueLabels: ['DeepL App', 'DeepL Website'],
        values: ['app', 'web'],
        description: "In 'DeepL App' mode, the app must be running, and have 'DeepL Shortcut' set to '⌘+C+C'."
    };
    const comboOption = {
        identifier: 'combo',
        label: 'DeepL App Shortcut',
        type: 'string',
        hidden: true,
        description: "Leave this blank to use '⌘+C+C', the default. Or type a shortcut like 'control option command D', if you have set custom DeepL preferences."
    };
    const { names, codes } = languageList();
    const languageOption = {
        identifier: 'destlang',
        label: 'Website Output Language',
        type: 'multiple',
        valueLabels: names,
        values: codes,
        defaultValue: 'EN-US',
        description: "Only affects 'DeepL Website' mode."
    };
    return [modeOption, comboOption, languageOption];
})();
// build the language list from the json file
function languageList() {
    const result = { codes: [], names: [] };
    for (const lang of langs_json_1.langs) {
        result.names.push(lang.name);
        result.codes.push(lang.language);
    }
    return result;
}
