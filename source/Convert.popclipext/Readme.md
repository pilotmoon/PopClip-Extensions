# Convert extension for PopClip

Convert quantities in metric units to US/imperial units, and vice-versa.

<img src="https://github.com/pilotmoon/PopClip-Extensions/blob/master/source/Convert.popclipext/Convert-demo.gif?raw=true" width=360>

Supports the following conversions: lb↔kg, oz↔g, miles↔km, feet/yards↔m,
inches↔cm, °F↔°C.

The result will be shown as the action's button title. Click the button to paste
the result, or shift-click to copy it.

This is not a "scientific" converter, rather it attempts to parse the input as
it might be encountered in ordinary writing, recipes, etc. Examples:

- `5 km`, `5km`, `5k`, `5K`, `5 kilometres`, `5 kilometers`, all give the result
  `3.1 miles`.

- `2in`, `2"` and `2 inches` all give `5.1 cm`.

- `80F`, `80 °F` and `80 fahrenheit` all give `26.7 °C`.

The output will attempt to match the number of decimal places of the input, so
`5.000km` will output `3.107 miles`. (However, the output will always have at
least one decimal place.)

Accepts either `,` or `.` as the decimal separator in the input. The output
decimal separator will be according to the current system locale.

Does not accept numbers with thousands separators in the input. (This would ne a
nice improvement.)

Wikipedia links:

- [Metric units](https://en.wikipedia.org/wiki/Metric_units)
- [Imperial units](https://en.wikipedia.org/wiki/Imperial_units)
- [United States customary units](https://en.wikipedia.org/wiki/United_States_customary_units)

## About

Author: Nick Moore

Requires PopClip 2023.9.

## Changelog

- 29 May 2025: Added support for mm to inch conversion. Modernize code structure
  to use Typescript only.
- 4 Nov 2021: Updated for macOS Monterey, rewritten in TypeScript. Now displays
  the output in the button title itself.
- 20 Oct 2020: Fix error on newer PHP versions.
- 16 Apr 2013: Initial release (PHP).
