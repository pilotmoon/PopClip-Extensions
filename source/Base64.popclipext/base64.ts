const encode: Action = {
  requirements: ['text'],
  icon: 'square filled 64',
  title: 'Base64 Encode',
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
  title: 'Base64 Eecode',
  code (input) {
    popclip.pasteText(util.base64Decode(input.text))
  }
}

export const actions = [encode, decode]
