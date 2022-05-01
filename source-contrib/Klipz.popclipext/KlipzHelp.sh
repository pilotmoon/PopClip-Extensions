# Selected text is either ? or HELP
if [ $POPCLIP_TEXT == "?" ]
then
	env >> /tmp/log.txt
	echo "NoDelete:CMD Paste${POPCLIP_OPTION_POP_TYPE}:OPT ChooseOne:CNTL StandardClip=${POPCLIP_OPTION_DEFAULT_CLIPBOARD} AlternateClip:SHFT"
else
	open KlipzHelp.pdf
fi

exit 0
