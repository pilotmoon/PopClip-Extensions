osascript -e "tell application \"Tweetbot\" to activate"
POPCLIP_ESCAPED="$(perl -MURI::Escape -e 'print uri_escape($ARGV[0]);' "$POPCLIP_TEXT")"
open "tweetbot:///post?text=$POPCLIP_ESCAPED"