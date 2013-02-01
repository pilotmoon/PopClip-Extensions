CLEANED_TEXT=`osascript clean-text.scpt "$POPCLIP_TEXT"`

if [ "$CLEANED_TEXT" = '#CANCEL' ]; then
	exit 0
else
	printf "$CLEANED_TEXT"
fi