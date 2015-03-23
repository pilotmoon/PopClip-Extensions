bid=`./SelectApp com.flexibits.fantastical2.mac com.flexibits.fantastical`
if [ "$bid" == "com.flexibits.fantastical2.mac" ]; then
	echo "2"
	./PerformService "Add to Fantastical 2" "$POPCLIP_TEXT"
	exit 0
elif [ "$bid" == "com.flexibits.fantastical" ]; then
	echo "1"
	./PerformService "Send to Fantastical" "$POPCLIP_TEXT"
	exit 0
fi
exit 1