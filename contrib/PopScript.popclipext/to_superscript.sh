#!/bin/zsh
set -euo pipefail

text="${POPCLIP_TEXT-}"
convert_symbols="${POPCLIP_OPTION_CONVERT_SYMBOLS:-1}"
convert_text="${POPCLIP_OPTION_CONVERT_TEXT:-0}"

if [[ -z "$text" ]]; then
  exit 0
fi

if [[ "$convert_symbols" == "1" ]]; then
  if [[ "$convert_text" == "1" ]]; then
    print -rn -- "$text" | perl -CS -Mutf8 -pe '
      tr/０-９/0-9/;
      tr/＋－＝（）/+\-=()/;
      s/[−–—]/-/g;
      tr/0-9+\-=()/⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾/;
      my %sup = (
        a => "ᵃ", b => "ᵇ", c => "ᶜ", d => "ᵈ", e => "ᵉ", f => "ᶠ", g => "ᵍ",
        h => "ʰ", i => "ⁱ", j => "ʲ", k => "ᵏ", l => "ˡ", m => "ᵐ", n => "ⁿ",
        o => "ᵒ", p => "ᵖ", r => "ʳ", s => "ˢ", t => "ᵗ", u => "ᵘ", v => "ᵛ",
        w => "ʷ", x => "ˣ", y => "ʸ", z => "ᶻ"
      );
      s/[A-Za-z]/exists $sup{lc($&)} ? $sup{lc($&)} : $&/ge;
    '
  else
    print -rn -- "$text" | perl -CS -Mutf8 -pe '
      tr/０-９/0-9/;
      tr/＋－＝（）/+\-=()/;
      s/[−–—]/-/g;
      tr/0-9+\-=()/⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾/;
    '
  fi
else
  if [[ "$convert_text" == "1" ]]; then
    print -rn -- "$text" | perl -CS -Mutf8 -pe '
      tr/０-９/0-9/;
      tr/0-9/⁰¹²³⁴⁵⁶⁷⁸⁹/;
      my %sup = (
        a => "ᵃ", b => "ᵇ", c => "ᶜ", d => "ᵈ", e => "ᵉ", f => "ᶠ", g => "ᵍ",
        h => "ʰ", i => "ⁱ", j => "ʲ", k => "ᵏ", l => "ˡ", m => "ᵐ", n => "ⁿ",
        o => "ᵒ", p => "ᵖ", r => "ʳ", s => "ˢ", t => "ᵗ", u => "ᵘ", v => "ᵛ",
        w => "ʷ", x => "ˣ", y => "ʸ", z => "ᶻ"
      );
      s/[A-Za-z]/exists $sup{lc($&)} ? $sup{lc($&)} : $&/ge;
    '
  else
    print -rn -- "$text" | perl -CS -Mutf8 -pe '
      tr/０-９/0-9/;
      tr/0-9/⁰¹²³⁴⁵⁶⁷⁸⁹/;
    '
  fi
fi
