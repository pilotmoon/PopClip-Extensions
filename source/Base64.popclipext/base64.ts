const encode: Action = {
  icon: 'square filled 64',
  title: 'Base64 Encode',
  code: (input, options) => {
    popclip.pasteText(util.base64Encode(input.text, {
      urlSafe: options.variant === 'url',
      trimmed: options.trim === true
    }))
    return null
  }
}

const decode: Action = {
  regex: /^[A-Za-z0-9+_\-/]+=?=?$/,
  icon: 'square 64',
  title: 'Base64 Decode',
  code (input) {
    popclip.pasteText(util.base64Decode(input.text))
    return null
  }
}

export const actions = [encode, decode]
