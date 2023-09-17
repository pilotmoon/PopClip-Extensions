"use strict";
/**
 * "aLtErNatInG CasE" eXtEnsIoN fOr pOpcLiP, FoR AlL YoUr mEmING NeeDS.
 * iCoN: sPonGe bY BeN dAvIs fRoM ThE NoUn pRoJeCt
 * @author Nick Moore
 * @module AlternatingCase
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Make characters alternately upper/lower case, with optional randomness sprinkled in.
 */
function alternatingCase(string, options) {
    function rnd() {
        return (options === null || options === void 0 ? void 0 : options.randomness) === true ? Math.random() : 0;
    }
    function start() {
        return rnd() < 0.5 ? 0 : 1;
    }
    function step() {
        const x = rnd();
        if (x < 0.8)
            return 2;
        if (x < 0.9)
            return 3;
        return 1;
    }
    const characters = string.toLowerCase().split('');
    for (let item = start(); item < characters.length; item += step()) {
        characters[item] = characters[item].toUpperCase();
    }
    return characters.join('');
}
const extension = {
    action: (selection, options) => {
        popclip.pasteText(alternatingCase(selection.text, { randomness: options.randomness }));
    },
    options: [
        {
            identifier: 'randomness',
            label: 'Add Randomness',
            type: 'boolean'
        }
    ]
};
exports.default = extension;
