osascript -e "tell application \"YoruFukurou\" to activate"
POPCLIP_ESCAPED="$(perl -MURI::Escape -e 'print uri_escape($ARGV[0]);' "$POPCLIP_TEXT")"
open "yorufukurou://pasteText/$POPCLIP_ESCAPED"