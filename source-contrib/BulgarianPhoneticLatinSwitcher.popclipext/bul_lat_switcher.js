// 1 way mapping
// from thread: https://forum.popclip.app/t/cyrillic-transliteration/824/22
const mapping = {
        "А": "A",
        "Б": "B",
        "В": "V",
        "Г": "G",
        "Д": "D",
        "Е": "E",
        "Ж": "V",
        "З": "Z",
        "И": "I",
        "Й": "J",
        "К": "K",
        "Л": "L",
        "М": "M",
        "Н": "N",
        "О": "O",
        "П": "P",
        "Р": "R",
        "С": "S",
        "Т": "T",
        "У": "U",
        "Ф": "F",
        "Х": "H",
        "Ц": "C",
        "Ч": "~",
        "Ш": "{",
        "Щ": "}",
        "Ъ": "Y",
        "Ь": "X",
        "Ю": "|",
        "Я": "Q",
        "а": "a",
        "б": "b",
        "в": "v",
        "г": "g",
        "д": "d",
        "е": "e",
        "ж": "v",
        "з": "z",
        "и": "i",
        "й": "j",
        "к": "k",
        "л": "l",
        "м": "m",
        "н": "n",
        "о": "o",
        "п": "p",
        "р": "r",
        "с": "s",
        "т": "t",
        "у": "u",
        "ф": "f",
        "х": "x",
        "ц": "c",
        "ч": "`",
        "ш": "[",
        "щ": "]",
        "ъ": "y",
        "ь": "x",
        "ю": "\\",
        "я": "q"
}

// build 2 way mapping
const two_way_mapping = {}
for (const [k, v] of Object.entries(mapping)) {
  two_way_mapping[k]=v;
  two_way_mapping[v]=k;
}



function switcher(text) {
    let result = ''

    for (let i = 0; i < text.length; ++i) {
        if (two_way_mapping[text[i]] == undefined) {
            result += text[i];
        } else {
            result += two_way_mapping[text[i]];
        }
    }

    return result
}


popclip.pasteText(switcher(popclip.input.text));


