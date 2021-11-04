for THIS_URL in $POPCLIP_URLS
do
	if [[ -n "$THIS_URL" ]]; then #if non-empty
		echo "Opening [$THIS_URL]"
		open "downie://XUOpenLink?url=$THIS_URL"
	fi
done