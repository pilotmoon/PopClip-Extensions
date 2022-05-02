import { transliterate, hasCyrillic } from './transliterate'

const testData = [
  ['Александр Сергеевич Пушкин', 'Aleksandr Sergeevič Puškin'],
  ['Щ', 'ŠČ'],
  ['Щедрин', 'Ščedrin'],
  ['ЩЕДРИН', 'ŠČEDRIN'],
  ['Щедрин ЩЕДРИН', 'Ščedrin ŠČEDRIN']
]

for (const [input, expected] of testData) {
  const result = transliterate(input)
  print(`${input} => ${result} (expected: ${expected}) - ${result === expected ? 'OK' : 'FAIL'}`)
}

const testData2 = [
  ['Александр Сергеевич Пушкин', true],
  ['Щ', true],
  ['', false],
  ['abc', false],
  ['aЩ', true]
]

for (const [input, expected] of testData2) {
  const result = hasCyrillic(input)
  print(`${input as string} => ${result ? 'true' : 'false'} (expected: ${expected as boolean ? 'true' : 'false'}) - ${result === expected ? 'OK' : 'FAIL'}`)
}
