/* eslint-disable @typescript-eslint/triple-slash-reference */
// #popclip
// name: Paste List
// language: javascript
// module: true

// variable for the current list
let lines: string[] = []

// action for setting the list
const setList: Action = {
  title: 'Set List',
  requirements: ['text'],
  code: (input) => {
    print('input', input)
    lines = input.text.split(/\n/)
    print('lines', lines)
  }
}

// action for pasting the first item in list
const pasteItem: Action = {
  title: 'Paste Item',
  requirements: ['paste'],
  code: () => {
    const line = lines.shift() ?? ''
    pasteboard.text = lines.join('\n')
    popclip.pasteText(line, { restore: true })
  }
}

export const actions: Action[] = [setList, pasteItem]
