if [ ! -z "$POPCLIP_HTML" ]; then
	echo $POPCLIP_HTML | ./html2text.py
else
	echo $POPCLIP_TEXT | ./html2text.py
fi