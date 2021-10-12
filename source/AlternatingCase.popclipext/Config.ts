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
 function alternatingCase(string: string) {
    let characters = string.toLowerCase().split("");
    let length = characters.length;
    for (let item = 0; item < length; item += 2) {
        characters[item] = characters[item].toUpperCase();
    }
    return characters.join("");
}

define({
    action(selection) {
        popclip.pasteText(alternatingCase(selection.text))
    }
})


