const encode: Action = {
  requirements: ['text'],
  icon: 'square filled 64',
  title: 'Base64 encode',
  code: (input, options) => {
    popclip.pasteText(util.base64Encode(input.text, {
      urlSafe: options.variant === 'url',
      trimmed: options.trim === true
    }))
  }
}

const decode: Action = {
  regex: /^[A-Za-z0-9+_\-/]+=?=?$/,
  icon: 'square 64',
  title: 'Base64 decode',
  code (input) {
    popclip.pasteText(util.base64Decode(input.text))
  }
}

export const actions = [encode, decode]
