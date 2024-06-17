/**
* Apply a text-transformation function to each input line, ignoring any the leading
* and trailing whitespace.
* @param text The text to transform
* @param f The transformation function
*/
export function transformLines (text: string, f: (s: string) => string): string {
  return text.replace(/^(\s*)(.*?)(\s*)$/gm, (match, before, middle, after) => {
    return `${before as string}${f(middle as string)}${after as string ?? ''}`
  })
}
transformLines.test = function () {
  var data = [
    ['  abc', '  ABC'],
    ['  abc\n aa', '  ABC\n AA']
  ]
  data.forEach(function (pair) {
    var input = pair[0]; var output = pair[1]
    var result = transformLines(input, (s) => s.toUpperCase())
    print((output === result ? 'pass  ' : 'fail * ' + input + ' => ' + result + ' (expected: ' + output + ')'))
  })
}
