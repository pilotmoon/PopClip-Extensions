/// <reference path="../../popclip.d.ts" />
/**
 * "Alternating Case" extension for PopClip, for all your meming needs.
 * Icon: sponge by Ben Davis from the Noun Project
 * @author Nick Moore
 * @module AlternatingCase
 */
/**
 * Make characters alternately upper/lower case.
 */
function alternatingCase(string) {
    var characters = string.toLowerCase().split("");
    var length = characters.length;
    for (var item = 0; item < length; item += 2) {
        characters[item] = characters[item].toUpperCase();
    }
    return characters.join("");
}
define({
    action: function (selection) {
        popclip.pasteText(alternatingCase(selection.text));
    }
});
