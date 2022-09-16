"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.action = void 0;
const axios_1 = require("axios");
const langs_json_1 = require("./langs.json");
const access_json_1 = require("./access.json");
// the translation endpoint
const { key } = util.clarify(access_json_1.access);
const endpoint = axios_1.default.create({
    baseURL: 'https://api.cognitive.microsofttranslator.com',
    headers: { 'Ocp-Apim-Subscription-Key': key },
    params: { 'api-version': '3.0' }
});
// translate using MS Translation api
async function translate(Text, to) {
    const response = await endpoint.post('translate', [{ Text }], { params: { to } });
    return response.data[0].translations[0].text;
}
// our action
const action = async (input, options) => {
    return await translate(input.text, options.destlang);
};
exports.action = action;
// the dynamically generated extension options
exports.options = (() => {
    const { names, codes } = languageList();
    const option = {
        identifier: 'destlang',
        label: {
            en: 'Destination Language',
            'zh-Hans': '翻译为',
            'zh-Hant': '轉換為'
        },
        type: 'multiple',
        valueLabels: names,
        values: codes,
        defaultValue: 'en'
    };
    return [option];
})();
// build the language list from the json file
// To fetch latest: `curl https://api.cognitive.microsofttranslator.com/languages\?api-version\=3.0\&scope\=translation > langs.json`
function languageList() {
    const result = { codes: [], names: [] };
    const entries = Object.entries(langs_json_1.translation);
    entries.sort(([k1, v1], [k2, v2]) => {
        return v1.name.localeCompare(v2.name);
    });
    for (const [key, value] of entries) {
        if (value.name === value.nativeName) {
            result.names.push(`${value.name}`);
        }
        else {
            result.names.push(`${value.name} / ${value.nativeName}`);
        }
        result.codes.push(key);
    }
    return result;
}
