"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.action = void 0;
const axios_1 = require("axios"); // TODO @popclip/axios
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
// the extension options; construct the options values from the json file
exports.options = (() => {
    const codes = [];
    const names = [];
    for (const [key, value] of Object.entries(langs_json_1.langs)) {
        names.push(key);
        codes.push(value);
    }
    return [
        {
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
        }
    ];
})();
