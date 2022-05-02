"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transliterate_1 = require("./transliterate");
const testData = [
    ['Александр Сергеевич Пушкин', 'Aleksandr Sergeevič Puškin'],
    ['Щ', 'ŠČ'],
    ['Щедрин', 'Ščedrin'],
    ['ЩЕДРИН', 'ŠČEDRIN'],
    ['Щедрин ЩЕДРИН', 'Ščedrin ŠČEDRIN']
];
for (const [input, expected] of testData) {
    const result = (0, transliterate_1.transliterate)(input);
    print(`${input} => ${result} (expected: ${expected}) - ${result === expected ? 'OK' : 'FAIL'}`);
}
const testData2 = [
    ['Александр Сергеевич Пушкин', true],
    ['Щ', true],
    ['', false],
    ['abc', false],
    ['aЩ', true]
];
for (const [input, expected] of testData2) {
    const result = (0, transliterate_1.hasCyrillic)(input);
    print(`${input} => ${result ? 'true' : 'false'} (expected: ${expected ? 'true' : 'false'}) - ${result === expected ? 'OK' : 'FAIL'}`);
}
