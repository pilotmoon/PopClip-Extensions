osascript -e "tell application \"Twitterrific\" to activate"
POPCLIP_UNAME="$(perl -MURI::Escape -e 'print substr($ARGV[0], 1);' "$POPCLIP_TEXT")"
open "twitterrific:///profile?screen_name=$POPCLIP_UNAME"