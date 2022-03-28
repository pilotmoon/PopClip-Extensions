(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.caseAnything = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.CaseAnything = {}));
})(this, (function (exports) { 'use strict';

  // Latin-1 Supplement
  // upper case ranges
  // [À-ÖØ-ß]
  // lower case ranges
  // [à-öø-ÿ]
  /**
   * A string.match function that will return an array of "string parts"
   *
   * @param {string} string
   * @returns {string[]}
   */
  function splitOnSpecialChars(string) {
      return string.match(/^[a-zà-öø-ÿ]+|[A-ZÀ-ÖØ-ß][a-zà-öø-ÿ]+|[a-zà-öø-ÿ]+|[0-9]+|[A-ZÀ-ÖØ-ß]+(?![a-zà-öø-ÿ])/g);
  }
  /**
   * A string.match function that will return an array of "string parts"
   *
   * @param {string} string
   * @returns {string[]}
   */
  function getParts(string, noSpecialChars) {
      if (noSpecialChars === void 0) { noSpecialChars = false; }
      var target = string.trim().normalize('NFC');
      var parts = target.includes(' ') ? target.split(' ').filter(Boolean) : splitOnSpecialChars(target);
      return noSpecialChars ? parts.map(function (part) { return part.normalize('NFD').replace(/[^a-zA-ZØßø0-9]/g, ''); }) : parts;
  }
  /**
   * Capitalises a single word
   *
   * @export
   * @param {string} string the word
   * @returns {string} the word with the first character in uppercase and the rest in lowercase
   */
  function capitaliseWord(string) {
      return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }

  var noSpecialChars = true;
  /**
   * converts strings to camelCase
   *
   * @export
   * @param {string} string
   * @returns {string} in camelCase
   */
  function camelCase(string) {
      return getParts(string, noSpecialChars).reduce(function (result, match, index) {
          return index === 0 ? match.toLowerCase() : result + capitaliseWord(match);
      }, '');
  }
  /**
   * converts strings to PascalCase
   *
   * @export
   * @param {string} string
   * @returns {string} in PascalCase
   */
  function pascalCase(string) {
      return getParts(string, noSpecialChars).reduce(function (result, match) {
          return result + capitaliseWord(match);
      }, '');
  }
  /**
   * converts strings to kebab-case
   *
   * @export
   * @param {string} string
   * @returns {string} in kebab-case
   */
  function kebabCase(string) {
      return getParts(string, noSpecialChars).join('-').toLowerCase();
  }
  /**
   * converts strings to snake_case
   *
   * @export
   * @param {string} string
   * @returns {string} in snake_case
   */
  function snakeCase(string) {
      return getParts(string, noSpecialChars).join('_').toLowerCase();
  }
  /**
   * converts strings to CONSTANT_CASE
   *
   * @export
   * @param {string} string
   * @returns {string} in CONSTANT_CASE
   */
  function constantCase(string) {
      return getParts(string, noSpecialChars).join('_').toUpperCase();
  }
  /**
   * converts strings to path/case
   *
   * @export
   * @param {string} string
   * @returns {string} in path/case
   */
  function pathCase(string) {
      return getParts(string).join('/');
  }
  /**
   * converts strings to space case (will add spaces but not change casing)
   *
   * @export
   * @param {string} string
   * @returns {string} in path case
   */
  function spaceCase(string) {
      return getParts(string).join(' ');
  }
  /**
   * converts strings to Capital Case (with spaces)
   *
   * @export
   * @param {string} string
   * @returns {string} in Capital Case (with spaces)
   */
  function capitalCase(string) {
      return getParts(string)
          .reduce(function (result, match) {
          return "".concat(result, " ").concat(capitaliseWord(match));
      }, '')
          .trim();
  }
  /**
   * converts strings to lower case (with spaces)
   *
   * @export
   * @param {string} string
   * @returns {string} in lower case (with spaces)
   */
  function lowerCase(string) {
      return getParts(string).join(' ').toLowerCase();
  }
  /**
   * converts strings to UPPER CASE (with spaces)
   *
   * @export
   * @param {string} string
   * @returns {string} in UPPER CASE (with spaces)
   */
  function upperCase(string) {
      return getParts(string).join(' ').toUpperCase();
  }

  exports.camelCase = camelCase;
  exports.capitalCase = capitalCase;
  exports.constantCase = constantCase;
  exports.kebabCase = kebabCase;
  exports.lowerCase = lowerCase;
  exports.pascalCase = pascalCase;
  exports.pathCase = pathCase;
  exports.snakeCase = snakeCase;
  exports.spaceCase = spaceCase;
  exports.upperCase = upperCase;

  Object.defineProperty(exports, '__esModule', { value: true });

}));

},{}],2:[function(require,module,exports){
module.exports=require("case-anything")

},{"case-anything":1}]},{},[2])(2)
});
