text=$POPCLIP_TEXT
encoded_text=$(echo "${text}" | perl -MURI::Escape -wlne 'print uri_escape ($_)' | perl -pe 's/\n/%0A/')
qr_image="/tmp/qrimage.png"
curl -Lso "${qr_image}" "http://chart.apis.google.com/chart?cht=qr&chs=400x400&chl=${encoded_text}&chld=H|0"

qlmanage -p "${qr_image}" &>/dev/null &