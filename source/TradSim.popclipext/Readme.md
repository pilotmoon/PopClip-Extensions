# Traditional/Simplified

Convert text between Traditional and Simplified Chinese.

The extension has two actions:

- **简** (jiǎn), which converts to Simplified Chinese.
- **繁** (fán), which converts to Traditional Chinese.

Neither action appears if the selected text contains no Chinese characters.

## Notes

Author: Nick Moore

The conversion is performed by the [tongwen-core](https://github.com/tongwentang/tongwen-core) library with the [tongwen-dict](https://github.com/tongwentang/tongwen-dict) dictionaries, both MIT Licensed.

The regex is based on "CJK Unified Ideographs" and "CJK Unified Ideographs Extension A" from [Table 18-1 "Blocks Containing Han Ideographs" in Unicode Standard](https://www.unicode.org/versions/Unicode15.0.0/ch18.pdf).

## Changelog

- 21 Jun 2024: Initial release
