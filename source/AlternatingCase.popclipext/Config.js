/**
 * "alTerNaTinG CaSe" ExTeNsiOn foR PoPclIp, fOr aLl yoUr MeMiNg nEeDs.
 * iCoN: sPoNgE By BeN DaViS FrOm tHe nOuN PrOjEcT
 * @author Nick Moore
 * @module AlternatingCase
 */
/**
 * Make characters alternately upper/lower case, with optional randomness sprinkled in.
 */
function alternatingCase(string, options) {
    function skip() {
        if ((options === null || options === void 0 ? void 0 : options.randomness) !== true) {
            return 0;
        }
        else {
            var x = Math.random();
            if (x < 0.8)
                return 2;
            if (x < 0.9)
                return 3;
            return 1;
        }
    }
    function start() {
        if ((options === null || options === void 0 ? void 0 : options.randomness) !== true) {
            return 0;
        }
        else {
            return Math.random() < 0.5 ? 0 : 1;
        }
    }
    var characters = string.toLowerCase().split('');
    for (var item = start(); item < characters.length; item += skip()) {
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
