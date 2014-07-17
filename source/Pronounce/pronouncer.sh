Url='http://dictionary.reference.com/browse/'$POPCLIP_TEXT

getURL() {
    curl -s $Url | grep -m1 -oE 'http.+?mp3' | head -1
}

if [[ -s /tmp/$POPCLIP_TEXT.mp3 ]]; then
    afplay "/tmp/$POPCLIP_TEXT.mp3"
else
    extractedURL=$(getURL)
    if [[ ! $extractedURL == *swf* && ! -z $extractedURL ]]; then
        curl -s -o "/tmp/$POPCLIP_TEXT.mp3" $extractedURL
        afplay "/tmp/$POPCLIP_TEXT.mp3"
    else
        exit 1
    fi
fi
