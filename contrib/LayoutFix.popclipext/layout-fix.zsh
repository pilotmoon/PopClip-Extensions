#!/bin/zsh
#
# layout-fix.zsh — Convert text between Latin and a macOS keyboard layout.
#
# PopClip extension that fixes text typed with the wrong keyboard layout.
# Uses the user's active keyboard layout from macOS and a bundled catalog
# of layout mappings extracted via UCKeyTranslate.
#
# Requirements: macOS, zsh, base64, awk, defaults, plutil, python3 — all stock.

emulate -L zsh
setopt errexit nounset pipefail

readonly SCRIPT_DIR="${0:A:h}"
readonly DATA_FILE="${SCRIPT_DIR}/layouts.nonlatin.tsv"
readonly PREFS_FILE="${HOME}/Library/Preferences/com.apple.HIToolbox.plist"
readonly DEFAULTS_DOMAIN="com.apple.HIToolbox"

# ── Entry Point ───────────────────────────────────────────────────────────────

main() {
  local text
  text="$(read_input_text)" || return 0
  [[ -n "$text" ]] || return 0

  if [[ ! -f "$DATA_FILE" ]]; then
    print -r -- "Layout Fix: catalog file missing (layouts.nonlatin.tsv)." >&2
    return 1
  fi

  local record
  record="$(resolve_preferred_record)" || {
    print -r -- "Layout Fix: no supported keyboard layout detected." >&2
    return 1
  }

  local layout_id layout_name identity target_chars
  local latin_source latin_target target_source target_target
  IFS=$'\t' read -r layout_id layout_name identity target_chars \
    latin_source latin_target target_source target_target <<<"$record"

  local mode="${POPCLIP_OPTION_MODE:-auto}"
  local direction
  direction="$(resolve_direction "$text" "$mode" "$target_chars")" || return 0

  if [[ "$direction" == "to-layout" ]]; then
    print -rn -- "$(convert_text "$text" "$latin_source" "$latin_target")"
  else
    print -rn -- "$(convert_text "$text" "$target_source" "$target_target")"
  fi
}

# ── Input ─────────────────────────────────────────────────────────────────────

read_input_text() {
  local text
  if [[ -n "${POPCLIP_TEXT-}" ]]; then
    text="$POPCLIP_TEXT"
  elif [[ ! -t 0 ]]; then
    text="$(cat)"
  else
    return 1
  fi

  # NFC normalization: macOS delivers text in NFD (decomposed) form which
  # breaks lookup for characters like й (U+0439 → и + combining breve).
  print -rn -- "$text" | /usr/bin/python3 -c \
    "import sys,unicodedata; print(unicodedata.normalize('NFC',sys.stdin.read()),end='')"
}

# ── Layout Resolution ─────────────────────────────────────────────────────────

resolve_preferred_record() {
  local current_id current_id_b64 record

  current_id="$(read_plist_scalar AppleCurrentKeyboardLayoutInputSourceID)"
  if [[ -n "$current_id" ]]; then
    current_id_b64="$(b64_encode "$current_id")"
    if record="$(find_record_by_field 1 "$current_id_b64")"; then
      print -r -- "$(decode_record_row "$record")"
      return 0
    fi
  fi

  local key
  for key in AppleInputSourceHistory AppleSelectedInputSources AppleEnabledInputSources; do
    if record="$(find_record_from_defaults "$key")"; then
      print -r -- "$(decode_record_row "$record")"
      return 0
    fi
  done

  if record="$(find_first_non_identity_record)"; then
    print -r -- "$(decode_record_row "$record")"
    return 0
  fi

  return 1
}

read_plist_scalar() {
  /usr/bin/plutil -extract "$1" raw -o - "$PREFS_FILE" 2>/dev/null || true
}

find_record_from_defaults() {
  local key="$1"
  local defaults_output layout_name layout_name_b64 record
  defaults_output="$(/usr/bin/defaults read "$DEFAULTS_DOMAIN" "$key" 2>/dev/null || true)"

  while IFS= read -r layout_name; do
    [[ -n "$layout_name" ]] || continue
    layout_name_b64="$(b64_encode "$layout_name")"
    if record="$(find_record_by_field 2 "$layout_name_b64")"; then
      print -r -- "$record"
      return 0
    fi
  done < <(
    print -r -- "$defaults_output" | awk -F '= |;' '
      /KeyboardLayout Name/ {
        gsub(/^[[:space:]]+|[[:space:]]+$/, "", $2)
        print $2
      }
    '
  )

  return 1
}

find_record_by_field() {
  /usr/bin/awk -F $'\t' -v field_index="$1" -v needle="$2" '
    $field_index == needle { print; found = 1; exit }
    END { exit found ? 0 : 1 }
  ' "$DATA_FILE"
}

find_first_non_identity_record() {
  /usr/bin/awk -F $'\t' '
    $3 == 0 { print; found = 1; exit }
    END { exit found ? 0 : 1 }
  ' "$DATA_FILE"
}

# ── Direction Detection ───────────────────────────────────────────────────────

resolve_direction() {
  local text="$1"
  local mode="$2"
  local target_chars="$3"

  case "$mode" in
    latin-to-layout) print -r -- "to-layout"; return 0 ;;
    layout-to-latin) print -r -- "to-latin"; return 0 ;;
  esac

  local latin_count target_count
  latin_count="$(count_ascii_letters "$text")"
  target_count="$(count_target_chars "$text" "$target_chars")"

  if (( latin_count == 0 && target_count == 0 )); then
    return 1
  fi

  if (( latin_count >= target_count )); then
    print -r -- "to-layout"
  else
    print -r -- "to-latin"
  fi
}

count_ascii_letters() {
  print -rn -- "$1" | /usr/bin/tr -cd 'A-Za-z' | /usr/bin/wc -c | /usr/bin/tr -d ' '
}

count_target_chars() {
  local text="$1"
  local target_chars="$2"
  integer count=0
  local char
  for char in ${(s::)text}; do
    [[ "$target_chars" == *"$char"* ]] && ((++count))
  done
  print -r -- "$count"
}

# ── Text Conversion ───────────────────────────────────────────────────────────

convert_text() {
  local text="$1"
  local source="$2"
  local target="$3"

  local -a source_chars target_chars text_chars
  source_chars=(${(s::)source})
  target_chars=(${(s::)target})
  text_chars=(${(s::)text})

  local -A map
  integer i limit=${#source_chars}
  (( ${#target_chars} < limit )) && limit=${#target_chars}
  for ((i = 1; i <= limit; ++i)); do
    map[${source_chars[$i]}]=${target_chars[$i]}
  done

  local output="" char mapped
  for char in "${text_chars[@]}"; do
    mapped="${map[$char]-}"

    # Fallback: try lowercase lookup for case-insensitive match.
    if [[ -z "$mapped" ]]; then
      local lc="${char:l}"
      [[ "$lc" != "$char" ]] && mapped="${map[$lc]-}"
    fi

    # Preserve uppercase: if input is uppercase, uppercase the result.
    if [[ -n "$mapped" && "$char" == "${char:u}" && "$char" != "${char:l}" ]]; then
      mapped="${mapped:u}"
    fi

    output+="${mapped:-$char}"
  done

  print -rn -- "$output"
}

# ── Base64 Helpers ────────────────────────────────────────────────────────────

b64_encode() {
  print -rn -- "$1" | /usr/bin/base64 | tr -d '\n'
}

decode_b64() {
  print -rn -- "$1" | /usr/bin/base64 -D 2>/dev/null
}

decode_record_row() {
  local row="$1"
  local id_b64 name_b64 identity target_chars_b64
  local latin_source_b64 latin_target_b64 target_source_b64 target_target_b64
  IFS=$'\t' read -r id_b64 name_b64 identity target_chars_b64 \
    latin_source_b64 latin_target_b64 target_source_b64 target_target_b64 <<<"$row"

  printf '%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s' \
    "$(decode_b64 "$id_b64")" \
    "$(decode_b64 "$name_b64")" \
    "$identity" \
    "$(decode_b64 "$target_chars_b64")" \
    "$(decode_b64 "$latin_source_b64")" \
    "$(decode_b64 "$latin_target_b64")" \
    "$(decode_b64 "$target_source_b64")" \
    "$(decode_b64 "$target_target_b64")"
}

main "$@"
