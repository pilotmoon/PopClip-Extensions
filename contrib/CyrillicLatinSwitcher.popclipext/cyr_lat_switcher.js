const CHAR_REPLACER = {
    // cyr
    'й': 'q',
    'ц': 'w',
    'у': 'e',
    'к': 'r',
    'е': 't',
    'н': 'y',
    'г': 'u',
    'ш': 'i',
    'щ': 'o',
    'з': 'p',
    'х': '[',
    'ъ': ']',
    'ф': 'a',
    'ы': 's',
    'в': 'd',
    'а': 'f',
    'п': 'g',
    'р': 'h',
    'о': 'j',
    'л': 'k',
    'д': 'l',
    'ж': ';',
    'э': '\'',
    'ё': '\\',
    'я': 'z',
    'ч': 'x',
    'с': 'c',
    'м': 'v',
    'и': 'b',
    'т': 'n',
    'ь': 'm',
    'б': ',',
    'ю': '.',
    'Й': 'Q',
    'Ц': 'W',
    'У': 'E',
    'К': 'R',
    'Е': 'T',
    'Н': 'Y',
    'Г': 'U',
    'Ш': 'I',
    'Щ': 'O',
    'З': 'P',
    'Х': '{',
    'Ъ': '}',
    'Ф': 'A',
    'Ы': 'S',
    'В': 'D',
    'А': 'F',
    'П': 'G',
    'Р': 'H',
    'О': 'J',
    'Л': 'K',
    'Д': 'L',
    'Ж': ':',
    'Э': '\"',
    'Ё': '|',
    'Я': 'Z',
    'ч': 'X',
    'С': 'C',
    'М': 'V',
    'И': 'B',
    'Т': 'N',
    'Ь': 'M',
    'Б': '<',
    'Ю': '>',
    //  lat
    'q': 'й',
    'w': 'ц',
    'e': 'у',
    'r': 'к',
    't': 'е',
    'y': 'н',
    'u': 'г',
    'i': 'ш',
    'o': 'щ',
    'p': 'з',
    '[': 'х',
    ']': 'ъ',
    'a': 'ф',
    's': 'ы',
    'd': 'в',
    'f': 'а',
    'g': 'п',
    'h': 'р',
    'j': 'о',
    'k': 'л',
    'l': 'д',
    ';': 'ж',
    '\'': 'э',
    '\\': 'ё',
    'z': 'я',
    'x': 'ч',
    'c': 'с',
    'v': 'м',
    'b': 'и',
    'n': 'т',
    'm': 'ь',
    ',': 'б',
    '.': 'ю',
    'Q': 'Й',
    'W': 'Ц',
    'E': 'У',
    'R': 'К',
    'T': 'Е',
    'Y': 'Н',
    'U': 'Г',
    'I': 'Ш',
    'O': 'Щ',
    'P': 'З',
    '{': 'Х',
    '}': 'Ъ',
    'A': 'Ф',
    'S': 'Ы',
    'D': 'В',
    'F': 'А',
    'G': 'П',
    'H': 'Р',
    'J': 'О',
    'K': 'Л',
    'L': 'Д',
    ':': 'Ж',
    '"': 'Э',
    '|': 'Ё',
    'Z': 'Я',
    'X': 'Ч',
    'C': 'С',
    'V': 'М',
    'B': 'И',
    'N': 'Т',
    'M': 'Ь',
    '<': 'Б',
    '>': 'Ю',
}

function switcher(text) {
    let result = ''

    for (let i = 0; i < text.length; ++i) {
        if (CHAR_REPLACER[text[i]] == undefined) {
            result += text[i];
        } else {
            result += CHAR_REPLACER[text[i]];
        }
    }

    return result
}

if (typeof (define) !== 'undefined') { // when running in popclip, export the function
    define(() => {
        return (selection) => {
            popclip.pasteText(switcher(selection.text));
        }
    })
}
else { // when running in jsc, perform tests
    function test() {
        const data = [
            ['Руддщ', 'Hello'],
            ['РуДДщю', 'HeLLo.'],
            ['gHbdtN. Rfr ltkF?', 'пРивеТю Как делА?'],
            ['|;"r \\:\'r', 'ЁжЭк ёЖэк'],
            ['<.hj ,>hj', 'Бюро бЮро'],
            ['{}{ [][', 'ХЪХ хъх'],
        ];
        data.forEach((pair) => {
            const [input, output] = pair;
            const result = switcher(input);
            print(`${output === result ? 'pass  ' : 'fail *'} ${input} => ${result} (expected: ${output})`);
        });
    }
    test();
}
