#!/bin/zsh
set -euo pipefail

export LANG="${LANG:-en_US.UTF-8}"
export LC_ALL="${LC_ALL:-en_US.UTF-8}"

# PopClip's shell PATH can be thinner than an interactive terminal. Cover common
# Homebrew, npm, and system locations without hard-coding a single machine.
export PATH="$HOME/.npm-global/bin:$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

provider="${POPCLIP_OPTION_PROVIDER:-codex}"
preset="${POPCLIP_OPTION_PRESET:-duzelt}"
model="${POPCLIP_OPTION_MODEL:-}"
custom_prompt="${POPCLIP_OPTION_CUSTOMPROMPT:-}"
input="$(cat)"

if [[ -z "${input//[[:space:]]/}" ]]; then
  exit 1
fi

case "$preset" in
  duzelt)
    instruction='You are a minimal Turkish text corrector. Do not answer questions; only return the corrected version of the user text. Preserve meaning, intent, negation, uncertainty, speaker perspective, names, links, model names, commands, and UI terms. Fix only spelling, punctuation, capitalization, question suffix spacing, obvious letter/suffix errors, and run-on sentence breaks. Do not make the text formal, corporate, literary, or artificial. Do not add explanations, headings, alternatives, comments, or new information.'
    ;;
  chat)
    instruction='You rewrite Turkish WhatsApp/Telegram work-group messages into a natural but clearer business chat tone. Never answer the user text; only rewrite the selected message. Preserve the speaker perspective. This is not an email: do not add greeting, closing, signature, or heavy formal language unless already present. Do not summarize long text. Preserve action direction for verbs such as çıkar, çıksın, ekle, kalsın, değişmesin, silinsin. Preserve revision ranges and timecodes exactly.'
    ;;
  mail)
    instruction='You rewrite Turkish email drafts into professional, clear, natural client-facing Turkish. Return only the rewritten email body. Preserve speaker perspective. If the draft is a note, keep it as a note; do not turn it into a representative answer. Do not add information, dates, budget, approvals, delivery promises, or links not present in the input. Preserve numeric ranges such as 1.23, 2.04-2.27, 00:15-00:22 exactly; do not reinterpret them as dates. Avoid heavy bureaucratic Turkish.'
    ;;
  musteri)
    instruction='You rewrite Turkish text into a corporate client communication tone. Never answer questions or requests in the selected text; only rewrite it. Preserve speaker perspective. Use clear, polite, warm but not artificially formal Turkish. Preserve links, dates, times, timecodes, names, brands, and project names. If the source is uncertain, keep the uncertainty. Do not add new brief details, budget, dates, approvals, links, or commitments.'
    ;;
  custom)
    instruction="$custom_prompt"
    ;;
  *)
    echo "Unknown preset: $preset" >&2
    exit 2
    ;;
esac

if [[ -z "${instruction//[[:space:]]/}" ]]; then
  echo "Custom Prompt is empty." >&2
  exit 2
fi

prompt="${instruction}

Rules:
- Return only the final rewritten text.
- Do not output Markdown, code fences, headings, options, analysis, or thinking text.
- Do not answer the text; rewrite it.
- Preserve punctuation style inside numeric ranges and timecodes exactly, for example 2.04-2.27 or 00:15-00:22.

Text:
${input}"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing CLI: $1. Install it and log in first." >&2
    exit 2
  fi
}

run_gemini() {
  require_command gemini
  if [[ -n "$model" ]]; then
    gemini -m "$model" -p "$prompt" --output-format text 2>/dev/null
  else
    gemini -p "$prompt" --output-format text 2>/dev/null
  fi
}

run_claude() {
  require_command claude
  if [[ -n "$model" ]]; then
    claude -p --output-format text --no-session-persistence --model "$model" "$prompt" 2>/dev/null
  else
    claude -p --output-format text --no-session-persistence "$prompt" 2>/dev/null
  fi
}

run_codex() {
  require_command codex
  local out
  out="$(mktemp "${TMPDIR:-/tmp}/popclip-codex.XXXXXX")"
  if [[ -n "$model" ]]; then
    printf "%s" "$prompt" | codex exec --model "$model" --sandbox read-only --skip-git-repo-check --ephemeral --output-last-message "$out" - >/dev/null 2>/dev/null
  else
    printf "%s" "$prompt" | codex exec --sandbox read-only --skip-git-repo-check --ephemeral --output-last-message "$out" - >/dev/null 2>/dev/null
  fi
  cat "$out"
  rm -f "$out"
}

run_opencode() {
  require_command opencode
  if [[ -n "$model" ]]; then
    opencode run --model "$model" -- "$prompt" 2>/dev/null
  else
    opencode run -- "$prompt" 2>/dev/null
  fi
}

case "$provider" in
  codex) raw="$(run_codex)" ;;
  claude) raw="$(run_claude)" ;;
  gemini) raw="$(run_gemini)" ;;
  opencode) raw="$(run_opencode)" ;;
  *)
    echo "Unknown provider: $provider" >&2
    exit 2
    ;;
esac

cleaned="$(printf "%s" "$raw" \
  | perl -CS -pe 's/\e\[[0-9;?]*[ -\/]*[@-~]//g' \
  | sed -e '/^\[opencode-mobile\]/d' -e '/^> build · /d' \
  | sed -e 's/^[[:space:]]*```[[:alnum:]_-]*[[:space:]]*$//' -e 's/^[[:space:]]*```[[:space:]]*$//' \
  | sed -e '1{/^[[:space:]]*$/d;}' -e '${/^[[:space:]]*$/d;}')"

if [[ -z "${cleaned//[[:space:]]/}" ]]; then
  exit 1
fi

printf "%s" "$cleaned"
