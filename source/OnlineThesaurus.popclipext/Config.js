// #popclip
// name: Online Thesaurus
// identifier: com.pilotmoon.popclip.extension.online-thesaurus
// description: >-
//   Search for the selected word in an online thesaurus. Includes Thesaurus.com,
//   Collins, and PowerThesaurus.
// icon: thesaurus.svg
// popclipVersion: 4151

let services = {
  "thesaurus.com": "http://thesaurus.com/browse/***",
  "collinsdictionary.com":
    "https://www.collinsdictionary.com/dictionary/english-thesaurus/***",
  "powerthesaurus.org": "https://www.powerthesaurus.org/***/synonyms",
};
// sorted array of display names
let names = Object.keys(services).sort();
let urls = names.map((key) => services[key]);
exports.options =[{
  identifier: "service",
  type: "multiple",
  label: "Thesaurus Service",
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
