bid=`./SelectApp com.runningwithcrayons.Alfred-3 com.runningwithcrayons.Alfred-2`
if [ "$bid" == "com.runningwithcrayons.Alfred-3" ]; then	
	echo "3"
	echo "tell application id \"com.runningwithcrayons.Alfred-3\" to search \"${POPCLIP_TEXT}\"" | osascript -
	exit 0
elif [ "$bid" == "com.runningwithcrayons.Alfred-2" ]; then
	echo "2"
	echo "tell application id \"com.runningwithcrayons.Alfred-2\" to search \"${POPCLIP_TEXT}\"" | osascript -
	exit 0
fi
exit 1