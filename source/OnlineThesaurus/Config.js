let services = {
	'thesaurus.com': 'http://thesaurus.com/browse/***',
	'collinsdictionary.com': 'https://www.collinsdictionary.com/dictionary/english-thesaurus/***',
    'powerthesaurus.org': 'https://www.powerthesaurus.org/***/synonyms'
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
    action: (selection, _context, options) => {
        popclip.openUrl(options.service.replace('***', encodeURIComponent(selection.text.toLowerCase())));
    }
});