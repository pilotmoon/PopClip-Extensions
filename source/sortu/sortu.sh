#echo $POPCLIP_TEXT | sort -u
echo $POPCLIP_URLENCODED_TEXT | perl -MURI::Escape -lne 'print uri_unescape($_)' | sort -u | sed '/^$/d'
