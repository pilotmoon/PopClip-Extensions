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
