osascript -e "tell application \"Tweetbot\" to activate"
POPCLIP_UNAME="$(perl -MURI::Escape -e 'print substr($ARGV[0], 0);' "$POPCLIP_TEXT")"
open "tweetbot:///user_profile/@$POPCLIP_UNAME"