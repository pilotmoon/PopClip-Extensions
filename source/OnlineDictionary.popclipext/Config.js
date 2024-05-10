// name: Online Dictionary
// identifier: xcom.pilotmoon.popclip.extension.online-dictionary
// description: >-
//   Search for the selected word in an online dictionary. Includes Dictionary.com,
//   Merriam Webster Online, Oxford Advanced Learner's Dictionary, Youdao, dict.cn,
//   dict.cc, and more.
// icon: dictionary.svg
// popclipVersion: 4151

let services = {
  "dicio.com.br": "https://www.dicio.com.br/***",
  "dict.cc": "https://www.dict.cc/?s=***",
  "dict.cn": "https://dict.cn/***",
  "dict.leo.org": "https://dict.leo.org/?search=***",
  "dict.youdao.com": "https://dict.youdao.com/search?q=***",
  "dictionary.com": "https://dictionary.reference.com/browse/***",
  "merriam-webster.com": "https://www.merriam-webster.com/dictionary/***",
  "oxfordlearnersdictionaries.com":
    "https://www.oxfordlearnersdictionaries.com/definition/english/***",
  "thefreedictionary.com": "https://www.thefreedictionary.com/***",
  "tureng.com": "https://tureng.com/search/***",
  "wordwebonline.com": "https://www.wordwebonline.com/search.pl?w=***",
  "collinsdictionary.com":
    "https://www.collinsdictionary.com/dictionary/english/***",
};
// sorted array of display names
let names = Object.keys(services).sort();
let urls = names.map((key) => services[key]);

exports.options = [{
  identifier: "service",
  type: "multiple",
  label: "Dictionary Service",
  values: urls,
  valueLabels: names,
}];

exports.action = (input, options) => {
  popclip.openUrl(
    options.service.replace(
      "***",
      encodeURIComponent(input.text.toLowerCase()),
    ),
  );
};
