#!/bin/bash
# GitHub Hop — selected text → GitHub repo page
# 1. "owner/repo" → direct jump (no API, instant)
# 2. other → resolve via GitHub Search API → jump to best repo
# 3. API fails / times out / rate limited → fallback to search page

set -euo pipefail

readonly PYTHON="/usr/bin/python3"
readonly CURL="/usr/bin/curl"

# Step 1: clean selected text
raw_text=$(printf '%s\n' "${POPCLIP_TEXT:-}" | $PYTHON -c "
import sys
text = sys.stdin.read().strip().strip('\"').strip(\"'\").strip()
if text.startswith('@'): text = text[1:]
print(text)
")

[ -z "$raw_text" ] && exit 1

# Step 2: URL-encode
encoded=$(printf '%s\n' "$raw_text" | $PYTHON -c "
import urllib.parse, sys
print(urllib.parse.quote(sys.stdin.read().strip(), safe=''))
")

# Step 3: owner/repo → direct jump (no API)
if printf '%s\n' "$raw_text" | grep -qE '^[a-zA-Z0-9][a-zA-Z0-9_.-]*/[a-zA-Z0-9_][a-zA-Z0-9_.-]*$'; then
    # nohup: PopClip sends SIGHUP to child processes; without it the browser never opens
    nohup /usr/bin/open "https://github.com/$raw_text" >/dev/null 2>&1 &
    exit 0
fi

# Step 4: try GitHub API
response=$($CURL -sf --connect-timeout 3 --max-time 5 \
    -H "Accept: application/vnd.github+json" \
    -H "User-Agent: github-hop-popclip/1.0" \
    "https://api.github.com/search/repositories?q=$encoded&per_page=3&sort=stars&order=desc" 2>/dev/null || true)

# Step 5: parse API response — pass raw_text as argv[1], not env var
# (avoid confusion with PopClip-injected POPCLIP_TEXT in sub-process)
target="FALLBACK"
if [ -n "$response" ]; then
    target=$(echo "$response" | $PYTHON -c "
import json, sys
try:
    data = json.loads(sys.stdin.read())
    items = data.get('items', [])
    if 'api rate limit' in data.get('message', '').lower():
        print('FALLBACK'); sys.exit(0)
    if not items:
        print('FALLBACK'); sys.exit(0)
    txt = sys.argv[1].strip().lower() if len(sys.argv) > 1 else ''
    best, score = items[0], 0
    for r in items:
        n = r['name'].lower()
        if txt == n: best, score = r, 3; break
        elif txt in n or n in txt: s = 2
        elif any(w in n for w in txt.split()): s = 1
        else: s = 0
        if s > score or (s == score and r.get('stargazers_count',0) > best.get('stargazers_count',0)):
            best, score = r, s
    print(best['full_name'])
except:
    print('FALLBACK')
" "$raw_text" 2>/dev/null || echo "FALLBACK")
fi

# Step 6: open in browser
if [ "$target" = "FALLBACK" ] || [ -z "$target" ]; then
    nohup /usr/bin/open "https://github.com/search?q=$encoded" >/dev/null 2>&1 &
else
    nohup /usr/bin/open "https://github.com/$target" >/dev/null 2>&1 &
fi
