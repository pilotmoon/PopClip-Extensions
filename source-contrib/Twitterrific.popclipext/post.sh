osascript -e "tell application \"Twitterrific\" to activate"
POPCLIP_ESCAPED="$(perl -MURI::Escape -e 'print uri_escape($ARGV[0]);' "$POPCLIP_TEXT")"
open "twitterrific:///post?message=$POPCLIP_ESCAPED"