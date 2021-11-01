# Sort

Sorts lines using a natural, case-insensitive sort. Empty lines are removed from the output.

### Requirements

Requires PopClip 2021.11 (3785).

### Notes

The original PHP version used the [`natcasesort`](https://www.php.net/manual/en/function.natcasesort.php) function,
which is a case-insensitive onatural ordering. (A natural ordering treats numbers as numeric values rather than character values, and so is more "human-like".)

In porting to JavaScript I have used [`localeCompare`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
with options `{numeric: true, sensitivity: 'base'}`.

### Authors

[Agassi](https://github.com/agassiyzh), Nick Moore

## Changelog

### v3 - 1 Nov 2021

* Reimplemented in JavaScript.

### v2 - 17 Dec 2015

* Modified to no longer remove duplicates.

### v1 - 8 Feb 2013

* Original extension (PHP) by Agassi.