"use strict";
/**
 * "Convert" extension for PopClip
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
// base constants
const kgPerLb = 0.45359237; // international avoirdupois pound
const cmPerInch = 2.54; // exact definition of the inch
// derived constants
const gPerOz = (kgPerLb / 16) * 1000;
const mPerFoot = (cmPerInch * 12) / 100;
const mPerYard = mPerFoot * 3;
const kmPerMile = (mPerYard * 1760) / 1000;
function formatOutput(num, places) {
    return Intl.NumberFormat(undefined, {
        useGrouping: false,
        minimumFractionDigits: places,
        maximumFractionDigits: places
    }).format(num);
}
// return the number of decimal places in the input string, if any. else 1.
function places(numberString) {
    const match = /\d[.,](\d+)/u.exec(numberString);
    if (match === null) {
        return 1;
    }
    else {
        return match[1].length;
    }
}
// convert the partial regex string to a full regex
function makeRegex(partial) {
    return new RegExp(`^\\s*((\\d+(?:[.,]\\d+)?)(\\s*)(?:${partial}))\\s*$`, 'ui');
}
const conversions = [
    // weight
    { regex: makeRegex('pounds?|lbs?'), outputUnit: 'kg', factor: kgPerLb },
    { regex: makeRegex('ounces?|oz'), outputUnit: 'g', factor: gPerOz },
    { regex: makeRegex('grams?|g'), outputUnit: 'oz', factor: 1 / gPerOz },
    { regex: makeRegex('kilograms?|kilos?|kg'), outputUnit: 'lb', factor: 1 / kgPerLb },
    // distance
    { regex: makeRegex('inches|inch|ins?|"'), outputUnit: 'cm', factor: cmPerInch },
    { regex: makeRegex("feet|foot|ft|'"), outputUnit: 'm', factor: mPerFoot },
    { regex: makeRegex('yards?|yds?'), outputUnit: 'm', factor: mPerYard },
    { regex: makeRegex('miles?|mi'), outputUnit: 'km', factor: kmPerMile },
    { regex: makeRegex('centimetres?|centimeters?|cm'), outputUnit: '"', factor: 1 / cmPerInch, space: 0 },
    { regex: makeRegex('kilometres?|kilometers?|km?'), outputUnit: 'miles', factor: 1 / kmPerMile, space: 1 },
    { regex: makeRegex('metres?|meters?|m'), outputUnit: "'", factor: 1 / mPerFoot, space: 0 },
    // temperature
    { regex: makeRegex('°?F|(?:degrees? )?fahrenheit'), outputUnit: '°C', factor: 1 },
    { regex: makeRegex('°?C|(?:degrees? )?celsius|(?:degrees? )?centigrade'), outputUnit: '°F', factor: 1 }
];
function convert(input) {
    for (let { regex, outputUnit, factor, space } of conversions) {
        // regex to match quantity expression like "10.5 kg" or "9,3cm" or "80F"
        // print('test', regex)
        const match = regex.exec(input);
        if (match === null) {
            continue;
        }
        const whole = match[1];
        const numberPart = match[2];
        let spacePart = match[3];
        let resultNumber = parseFloat(numberPart) * factor;
        if (outputUnit === "'" && resultNumber > 50) { // output in yards if many feet
            outputUnit = 'yards';
            resultNumber /= 3;
            space = 1;
        }
        else if (outputUnit === '°C') {
            resultNumber = ((resultNumber - 32) * 5) / 9;
        }
        else if (outputUnit === '°F') {
            resultNumber = ((resultNumber * 9) / 5) + 32;
        }
        // adjust the whitespace to output between number and unit
        if (space === 0) {
            spacePart = '';
        }
        else if (space === 1) {
            spacePart = ' ';
        }
        // put it all together
        const converted = formatOutput(resultNumber, places(numberPart)) + spacePart + outputUnit;
        return input.replace(whole, converted);
    }
    return null;
}
const actions = (input) => {
    const result = convert(input.text);
    if (result === null)
        return;
    const action = () => result;
    action.title = result;
    action.icon = null; // set null to allow title to show
    action.after = 'paste-result';
    return action;
};
exports.actions = actions;
