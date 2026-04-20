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
      tr/0-9+\-=()/₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎/;
      my %sub = (
        a => "ₐ", e => "ₑ", h => "ₕ", i => "ᵢ", j => "ⱼ", k => "ₖ", l => "ₗ",
        m => "ₘ", n => "ₙ", o => "ₒ", p => "ₚ", r => "ᵣ", s => "ₛ", t => "ₜ",
        u => "ᵤ", v => "ᵥ", x => "ₓ"
      );
      s/[A-Za-z]/exists $sub{lc($&)} ? $sub{lc($&)} : $&/ge;
    '
  else
    print -rn -- "$text" | perl -CS -Mutf8 -pe '
      tr/０-９/0-9/;
      tr/＋－＝（）/+\-=()/;
      s/[−–—]/-/g;
      tr/0-9+\-=()/₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎/;
    '
  fi
else
  if [[ "$convert_text" == "1" ]]; then
    print -rn -- "$text" | perl -CS -Mutf8 -pe '
      tr/０-９/0-9/;
      tr/0-9/₀₁₂₃₄₅₆₇₈₉/;
      my %sub = (
        a => "ₐ", e => "ₑ", h => "ₕ", i => "ᵢ", j => "ⱼ", k => "ₖ", l => "ₗ",
        m => "ₘ", n => "ₙ", o => "ₒ", p => "ₚ", r => "ᵣ", s => "ₛ", t => "ₜ",
        u => "ᵤ", v => "ᵥ", x => "ₓ"
      );
      s/[A-Za-z]/exists $sub{lc($&)} ? $sub{lc($&)} : $&/ge;
    '
  else
    print -rn -- "$text" | perl -CS -Mutf8 -pe '
      tr/０-９/0-9/;
      tr/0-9/₀₁₂₃₄₅₆₇₈₉/;
    '
  fi
fi
