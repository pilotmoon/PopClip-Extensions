# VAT Calculator

Add or remove VAT (or GST, sales tax, etc.) on a selected amount.

The extension shows a button named after the tax, which opens a submenu with two actions:

- **Add VAT** treats the selected amount as the net price and adds tax to it.
- **Remove VAT** treats the selected amount as the gross price and takes the tax out.

The result shows the net amount, the tax and the gross amount. For example, with a rate of 20%:

- Add VAT on `100` → `Net 100.00 + VAT 20.00 (20%) = Gross 120.00`
- Remove VAT on `120` → `Net 100.00 + VAT 20.00 (20%) = Gross 120.00`

Currency symbols and other text around the number are ignored. Both `1,234.50` and `1.234,50` are read as
one thousand two hundred thirty-four and a half.

## Options

- **Tax name:** The name shown on the button and in the result. Choose from VAT, GST, TVA, IVA, MwSt and
  Sales Tax, or choose Other to type your own.
- **Tax rate (%):** The tax percentage, for example `20` or `7.5`. The default is 20.

## About

Author: Nick Moore

## Changelog

- 18 Nov 2026: Initial release.
