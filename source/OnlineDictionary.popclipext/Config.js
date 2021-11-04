let services = {
    'dict.cc': 'https://www.dict.cc/?s=***',
    'dict.cn': 'https://dict.cn/***',
    'dict.leo.org': 'https://dict.leo.org/?search=***',
    'dict.youdao.com': 'https://dict.youdao.com/search?q=***',
    'dictionary.com': 'https://dictionary.reference.com/browse/***',
    'merriam-webster.com': 'https://www.merriam-webster.com/dictionary/***',
    'oxfordlearnersdictionaries.com': 'https://www.oxfordlearnersdictionaries.com/definition/english/***',
    'thefreedictionary.com': 'https://www.thefreedictionary.com/***',
    'tureng.com': 'https://tureng.com/search/***',
    'wordwebonline.com': 'https://www.wordwebonline.com/search.pl?w=***',
    'collinsdictionary.com': 'https://www.collinsdictionary.com/dictionary/english/***',
};
// sorted array of display names
let names=Object.keys(services).sort();
let urls=names.map((key) => services[key]);
define({
    options: [{
        identifier: "service",
        type: "multiple",
        label: "Dictionary Service",
        values: urls,
        valueLabels: names,
    }],
    action: (selection, options) => {
        popclip.openUrl(options.service.replace('***', encodeURIComponent(selection.text.toLowerCase())));
    }
});