/**
 * "alTerNaTinG CaSe" ExTeNsiOn foR PoPclIp, fOr aLl yoUr MeMiNg nEeDs.
 * iCoN: sPoNgE By BeN DaViS FrOm tHe nOuN PrOjEcT
 * @author Nick Moore
 * @module AlternatingCase
 */

/**
 * Make characters alternately upper/lower case, with optional randomness.
 */
function alternatingCase (string: string, options?: {randomness?: boolean}): string {
  /**
  * Random between 0 an 1, but only if randomness option is on. Otherwise always 0.
  */
  function rnd (): number {
    return options?.randomness === true ? Math.random() : 0
  }
  const characters = string.toLowerCase().split('')
  const length = characters.length
  for (let item = rnd() < 0.5 ? 0 : 1; item < length; item += (rnd() < 0.8 ? 2 : 3)) {
    characters[item] = characters[item].toUpperCase()
  }
  return characters.join('')
}

define({
  action (selection, context, options) {
    popclip.pasteText(alternatingCase(selection.text, { randomness: options.randomness }))
  },
  options: [
    {
      identifier: 'randomness',
      label: 'Add Randomness',
      type: 'boolean'
    }
  ]
})
