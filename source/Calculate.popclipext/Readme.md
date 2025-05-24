# Calculate

Evaluate the text as mathematical expression.

The result is displayed as the action's button title. Clicking the action button will paste or copy the result. (Holding Shift (⇧) will always copy.)

Examples with simple arithmetic:

- `1 + 1` → `2`.
- `15/2` → `7.5`
- `(50 + 1) * 2 - 5` → `97`.

It can also support quite complex expressions, as supported by [mathjs](https://mathjs.org/):

- `155 miles * 18% in km` = `44.9006976 km`
- `sqrt(4)` → `2`
- `sin(pi/2)` → `1`
- `4(2 + 3i)` → `8 + 12i`
- `a = 2; b = 3; 2a + b` → `7`

If the input text ends with an `=` character, the result will be appended to the input instead of replacing it. For example:

- `100/4=` → `100/4=25`

## About

Author: Nick Moore

The extension is implemented using [mathjs](https://mathjs.org/). The evaluation is performed using the `evaluate()` function of the library.

## Changelog

- 5 Jun 2024: Updated to work with PopClip 2024.5.
- 9 Sep 2022: Allow input and output with comma as decimal separator, as per system locale e.g. `3,1 * 2` → `6,2`.
- 16 Nov 2021: Prevent really long outputs when selecting a quoted string.
- 8 Nov 2021: Rewritten in JavaScript using mathjs library; displays result as title of button.
- 8 Apr 2013: Initial release (PHP).
