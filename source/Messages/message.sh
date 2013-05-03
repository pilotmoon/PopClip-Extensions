# We direct to null so PopClip does not sit around trying to read from stdout.
# Otherwise PopClip blocks and shows the spinner.
echo $POPCLIP_TEXT | ./MessageMaker > /dev/null &
