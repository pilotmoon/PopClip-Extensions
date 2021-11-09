# Calculate

Evaluate the text as mathematical expression.

<img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/source/Calculate.popclipext/Calculate-demo.gif" width="320px">

The result is displayed as the action's button title. Clicking the action button will paste or copy the result. (Holding Shift (⇧) will always copy.)

Examples with simple arithmetic:

* `1 + 1` → `2`.
* `15/2` → `7.5`
* `(50 + 1) * 2 - 5` → `97`.

It can also support quite complex expressions, as supported by [mathjs](https://mathjs.org/):

* `155 miles * 18% in km` = `44.9006976 km`
* `sqrt(4)` → `2`
* `sin(pi/2)` → `1`
* `4(2 + 3i)` → `8 + 12i`
* `a = 2; b = 3; 2a + b` → `7`

If the input text ends with an `=` character, the result will be appended to the input instead of replacing it. For example:

* `100/4=` → `100/4=25`

## About

This is an extension for [PopClip](https://pilotmoon.com/popclip/).

### Author

Nick Moore

### Requirements

Requires PopClip 2021.11.

### Notes

The extension is implemented using [mathjs](https://mathjs.org/). The evaluation is performed using the `evaluate()` function of the library.

## Changelog

### v2 - 8 Nov 2021

* Rewritten in JavaScript using mathjs library.
* Displays result as title of button.

### v1 - 8 Apr 2013

* Initial release (PHP).
