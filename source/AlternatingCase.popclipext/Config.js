/**
 * "alTerNaTinG CaSe" ExTeNsiOn foR PoPclIp, fOr aLl yoUr MeMiNg nEeDs.
 * iCoN: sPoNgE By BeN DaViS FrOm tHe nOuN PrOjEcT
 * @author Nick Moore
 * @module AlternatingCase
 */
/**
 * Make characters alternately upper/lower case, with optional randomness.
 *
 * When randomness is enabled, the case of the starting letter is chosen with a 50% split.
 * Then 20% of the time, two lowercase letters are outputted instead of one.
 */
function alternatingCase(string, options) {
    /**
    * Random between 0 an 1, but only if randomness option is on. Otherwise always 0.
    */
    function rnd() {
        return (options === null || options === void 0 ? void 0 : options.randomness) === true ? Math.random() : 0;
    }
    var characters = string.toLowerCase().split('');
    var length = characters.length;
    for (var item = rnd() < 0.5 ? 0 : 1; item < length; item += (rnd() < 0.8 ? 2 : 3)) {
        characters[item] = characters[item].toUpperCase();
    }
    return characters.join('');
}
define({
    action: function (selection, context, options) {
        popclip.pasteText(alternatingCase(selection.text, { randomness: options.randomness }));
    },
    options: [
        {
            identifier: 'randomness',
            label: 'Add Randomness',
            type: 'boolean'
        }
    ]
});
