COUNT=0
echo $SHELL
for THIS_URL in $POPCLIP_URLS
do
	let COUNT=COUNT+1
	if [[ -n "$THIS_URL" ]]; then #if non-empty
		echo "Opening [$THIS_URL]"
		open -b com.google.Chrome "$THIS_URL"
	fi
	if [[ $COUNT -ge 10 ]]; then #limit to 10 so as not to go crazy
		break
	fi
done