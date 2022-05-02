import { transliterate } from './transliterate'

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
