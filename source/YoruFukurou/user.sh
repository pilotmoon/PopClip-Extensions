osascript -e "tell application \"YoruFukurou\" to activate"
POPCLIP_UNAME="$(perl -MURI::Escape -e 'print substr($ARGV[0], 1);' "$POPCLIP_TEXT")"
open "yorufukurou://user/$POPCLIP_UNAME"