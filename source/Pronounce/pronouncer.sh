Url='http://www.dictionary.com/browse/'$POPCLIP_TEXT

getURL() {
    curl -sL $Url | grep -m1 -oE 'http[^"]+?mp3' | tail -1
}

if [[ -s /tmp/$POPCLIP_TEXT.mp3 ]]; then
    afplay "/tmp/$POPCLIP_TEXT.mp3"
else
    extractedURL=$(getURL)
    echo $extractedURL
    if [[ -n $extractedURL ]]; then
        curl -s -o "/tmp/$POPCLIP_TEXT.mp3" $extractedURL
        afplay "/tmp/$POPCLIP_TEXT.mp3"
    else
        exit 1
    fi
fi