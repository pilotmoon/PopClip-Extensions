(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.caseAnything = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// Latin-1 Supplement
// upper case ranges
// [À-ÖØ-ß]
// lower case ranges
// [à-öø-ÿ]
const magicSplit = /^[a-zà-öø-ÿ]+|[A-ZÀ-ÖØ-ß][a-zà-öø-ÿ]+|[a-zà-öø-ÿ]+|[0-9]+|[A-ZÀ-ÖØ-ß]+(?![a-zà-öø-ÿ])/g;
const spaceSplit = /\S+/g;
/**
 * A string.matchAll function that will return an array of "string parts" and the indexes at which it split each part
 */
function getPartsAndIndexes(string, splitRegex) {
    const result = { parts: [], prefixes: [] };
    const matches = string.matchAll(splitRegex);
    let lastWordEndIndex = 0;
    for (const match of matches) {
        if (typeof match.index !== 'number')
            continue;
        const word = match[0];
        result.parts.push(word);
        const prefix = string.slice(lastWordEndIndex, match.index).trim();
        result.prefixes.push(prefix);
        lastWordEndIndex = match.index + word.length;
    }
    const tail = string.slice(lastWordEndIndex).trim();
    if (tail) {
        result.parts.push('');
        result.prefixes.push(tail);
    }
    return result;
}
/**
 * A function that splits a string on words and returns an array of words.
 * - It can prefix each word with a given character
 * - It can strip or keep special characters, this affects the logic for adding a prefix as well
 */
function splitAndPrefix(string, options) {
    const { keepSpecialCharacters = false, keep, prefix = '' } = options || {};
    const normalString = string.trim().normalize('NFC');
    const hasSpaces = normalString.includes(' ');
    const split = hasSpaces ? spaceSplit : magicSplit;
    const partsAndIndexes = getPartsAndIndexes(normalString, split);
    return partsAndIndexes.parts
        .map((_part, i) => {
        let foundPrefix = partsAndIndexes.prefixes[i] || '';
        let part = _part;
        if (keepSpecialCharacters === false) {
            if (keep) {
                part = part.normalize('NFD').replace(new RegExp(`[^a-zA-ZØßø0-9${keep.join('')}]`, 'g'), '');
            }
            if (!keep) {
                part = part.normalize('NFD').replace(/[^a-zA-ZØßø0-9]/g, '');
                foundPrefix = '';
            }
        }
        if (keep) {
            foundPrefix = foundPrefix.replace(new RegExp(`[^${keep.join('')}]`, 'g'), '');
        }
        // the first word doesn't need a prefix, so only return the found prefix
        if (i === 0) {
            // console.log(`foundPrefix → `, foundPrefix)
            return foundPrefix + part;
        }
        if (!foundPrefix && !part)
            return '';
        if (!hasSpaces) {
            // return the found prefix OR fall back to a given prefix
            return (foundPrefix || prefix) + part;
        }
        // space based sentence was split on spaces, so only return found prefixes
        if (!foundPrefix && prefix.match(/\s/)) {
            // in this case we have no more found prefix, it was trimmed, but we're looking to add a space
            // so let's return that space
            return ' ' + part;
        }
        return (foundPrefix || prefix) + part;
    })
        .filter(Boolean);
}
/**
 * Capitalises a single word
 * @returns the word with the first character in uppercase and the rest in lowercase
 */
function capitaliseWord(string) {
    var _a;
    const firstLetterIndex = ((_a = string.matchAll(magicSplit).next().value) === null || _a === void 0 ? void 0 : _a.index) || 0;
    return string.slice(0, firstLetterIndex + 1).toUpperCase() + string.slice(firstLetterIndex + 1).toLowerCase();
}

/**
 * # 🐪 camelCase
 * converts a string to camelCase
 * - first lowercase then all capitalised
 * - *strips away* special characters by default
 *
 * @example
 *   camelCase('$catDog') === 'catDog'
 * @example
 *   camelCase('$catDog', { keepSpecialCharacters: true }) === '$catDog'
 */
function camelCase(string, options) {
    return splitAndPrefix(string, options).reduce((result, word, index) => {
        return index === 0 || !(word[0] || '').match(magicSplit)
            ? result + word.toLowerCase()
            : result + capitaliseWord(word);
    }, '');
}
/**
 * # 🐫 PascalCase
 * converts a string to PascalCase (also called UpperCamelCase)
 * - all capitalised
 * - *strips away* special characters by default
 *
 * @example
 *   pascalCase('$catDog') === 'CatDog'
 * @example
 *   pascalCase('$catDog', { keepSpecialCharacters: true }) === '$CatDog'
 */
function pascalCase(string, options) {
    return splitAndPrefix(string, options).reduce((result, word) => {
        return result + capitaliseWord(word);
    }, '');
}
/**
 * # 🐫 UpperCamelCase
 * converts a string to UpperCamelCase (also called PascalCase)
 * - all capitalised
 * - *strips away* special characters by default
 *
 * @example
 *   upperCamelCase('$catDog') === 'CatDog'
 * @example
 *   upperCamelCase('$catDog', { keepSpecialCharacters: true }) === '$CatDog'
 */
const upperCamelCase = pascalCase;
/**
 * # 🥙 kebab-case
 * converts a string to kebab-case
 * - hyphenated lowercase
 * - *strips away* special characters by default
 *
 * @example
 *   kebabCase('$catDog') === 'cat-dog'
 * @example
 *   kebabCase('$catDog', { keepSpecialCharacters: true }) === '$cat-dog'
 */
function kebabCase(string, options) {
    return splitAndPrefix(string, { ...options, prefix: '-' })
        .join('')
        .toLowerCase();
}
/**
 * # 🐍 snake_case
 * converts a string to snake_case
 * - underscored lowercase
 * - *strips away* special characters by default
 *
 * @example
 *   snakeCase('$catDog') === 'cat_dog'
 * @example
 *   snakeCase('$catDog', { keepSpecialCharacters: true }) === '$cat_dog'
 */
function snakeCase(string, options) {
    return splitAndPrefix(string, { ...options, prefix: '_' })
        .join('')
        .toLowerCase();
}
/**
 * # 📣 CONSTANT_CASE
 * converts a string to CONSTANT_CASE
 * - underscored uppercase
 * - *strips away* special characters by default
 *
 * @example
 *   constantCase('$catDog') === 'CAT_DOG'
 * @example
 *   constantCase('$catDog', { keepSpecialCharacters: true }) === '$CAT_DOG'
 */
function constantCase(string, options) {
    return splitAndPrefix(string, { ...options, prefix: '_' })
        .join('')
        .toUpperCase();
}
/**
 * # 🚂 Train-Case
 * converts strings to Train-Case
 * - hyphenated & capitalised
 * - *strips away* special characters by default
 *
 * @example
 *   trainCase('$catDog') === 'Cat-Dog'
 * @example
 *   trainCase('$catDog', { keepSpecialCharacters: true }) === '$Cat-Dog'
 */
function trainCase(string, options) {
    return splitAndPrefix(string, { ...options, prefix: '-' })
        .map((word) => capitaliseWord(word))
        .join('');
}
/**
 * # 🕊 Ada_Case
 * converts a string to Ada_Case
 * - underscored & capitalised
 * - *strips away* special characters by default
 *
 * @example
 *   adaCase('$catDog') === 'Cat_Dog'
 * @example
 *   adaCase('$catDog', { keepSpecialCharacters: true }) === '$Cat_Dog'
 */
function adaCase(string, options) {
    return splitAndPrefix(string, { ...options, prefix: '_' })
        .map((part) => capitaliseWord(part))
        .join('');
}
/**
 * # 👔 COBOL-CASE
 * converts a string to COBOL-CASE
 * - hyphenated uppercase
 * - *strips away* special characters by default
 *
 * @example
 *   cobolCase('$catDog') === 'CAT-DOG'
 * @example
 *   cobolCase('$catDog', { keepSpecialCharacters: true }) === '$CAT-DOG'
 */
function cobolCase(string, options) {
    return splitAndPrefix(string, { ...options, prefix: '-' })
        .join('')
        .toUpperCase();
}
/**
 * # 📍 Dot.notation
 * converts a string to dot.notation
 * - adds dots, does not change casing
 * - *strips away* special characters by default
 *
 * @example
 *   dotNotation('$catDog') === 'cat.Dog'
 * @example
 *   dotNotation('$catDog', { keepSpecialCharacters: true }) === '$cat.Dog'
 */
function dotNotation(string, options) {
    return splitAndPrefix(string, { ...options, prefix: '.' }).join('');
}
/**
 * # 📂 Path/case
 * converts a string to path/case
 * - adds slashes, does not change casing
 * - *keeps* special characters by default
 *
 * @example
 *   pathCase('$catDog') === '$cat/Dog'
 * @example
 *   pathCase('$catDog', { keepSpecialCharacters: false }) === 'cat/Dog'
 */
function pathCase(string, options = { keepSpecialCharacters: true }) {
    return splitAndPrefix(string, options).reduce((result, word, i) => {
        const prefix = i === 0 || word[0] === '/' ? '' : '/';
        return result + prefix + word;
    }, '');
}
/**
 * # 🛰 Space case
 * converts a string to space case
 * - adds spaces, does not change casing
 * - *keeps* special characters by default
 *
 * @example
 *   spaceCase('$catDog') === '$cat Dog'
 * @example
 *   spaceCase('$catDog', { keepSpecialCharacters: false }) === 'cat Dog'
 */
function spaceCase(string, options = { keepSpecialCharacters: true }) {
    return splitAndPrefix(string, { ...options, prefix: ' ' }).join('');
}
/**
 * # 🏛 Capital Case
 * converts a string to Capital Case
 * - capitalizes words and adds spaces
 * - *keeps* special characters by default
 *
 * @example
 *   capitalCase('$catDog') === '$Cat Dog'
 * @example
 *   capitalCase('$catDog', { keepSpecialCharacters: false }) === 'Cat Dog'
 *
 * ⟪ if you do not want to add spaces, use `pascalCase()` ⟫
 */
function capitalCase(string, options = { keepSpecialCharacters: true }) {
    return splitAndPrefix(string, { ...options, prefix: ' ' }).reduce((result, word) => {
        return result + capitaliseWord(word);
    }, '');
}
/**
 * # 🔡 lower case
 * converts a string to lower case
 * - makes words lowercase and adds spaces
 * - *keeps* special characters by default
 *
 * @example
 *   lowerCase('$catDog') === '$cat dog'
 * @example
 *   lowerCase('$catDog', { keepSpecialCharacters: false }) === 'cat dog'
 *
 * ⟪ if you do not want to add spaces, use the native JS `toLowerCase()` ⟫
 */
function lowerCase(string, options = { keepSpecialCharacters: true }) {
    return splitAndPrefix(string, { ...options, prefix: ' ' })
        .join('')
        .toLowerCase();
}
/**
 * # 🔠 UPPER CASE
 * converts a string to UPPER CASE
 * - makes words upper case and adds spaces
 * - *keeps* special characters by default
 *
 * @example
 *   upperCase('$catDog') === '$CAT DOG'
 * @example
 *   upperCase('$catDog', { keepSpecialCharacters: false }) === 'CAT DOG'
 *
 * ⟪ if you do not want to add spaces, use the native JS `toUpperCase()` ⟫
 */
function upperCase(string, options = { keepSpecialCharacters: true }) {
    return splitAndPrefix(string, { ...options, prefix: ' ' })
        .join('')
        .toUpperCase();
}

exports.adaCase = adaCase;
exports.camelCase = camelCase;
exports.capitalCase = capitalCase;
exports.cobolCase = cobolCase;
exports.constantCase = constantCase;
exports.dotNotation = dotNotation;
exports.kebabCase = kebabCase;
exports.lowerCase = lowerCase;
exports.pascalCase = pascalCase;
exports.pathCase = pathCase;
exports.snakeCase = snakeCase;
exports.spaceCase = spaceCase;
exports.trainCase = trainCase;
exports.upperCamelCase = upperCamelCase;
exports.upperCase = upperCase;

},{}],2:[function(require,module,exports){
module.exports=require("case-anything")

},{"case-anything":1}]},{},[2])(2)
});
