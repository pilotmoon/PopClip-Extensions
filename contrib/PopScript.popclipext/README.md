## PopScript

Convert selected text into Unicode subscript or superscript with one click.

### Actions
- `ₓ`: Converts numbers to subscript. Example: `C6H12O6` -> `C₆H₁₂O₆`.
- `ˣ`: Converts numbers to superscript. Example: `x2 + y10` -> `x² + y¹⁰`.

### Settings
- `Convert + - = ( ) symbols too`: Also converts supported symbols to sub/sup variants.
- `Also convert text` (default: off): Converts letters where Unicode sub/sup forms exist.

### Quality-of-life
- Supports full-width digits (`０-９`) by normalizing them first.
- Handles full-width symbols (`＋－＝（）`) when symbol conversion is enabled.
- Normalizes minus variants (`− – —`) for consistent symbol conversion.
