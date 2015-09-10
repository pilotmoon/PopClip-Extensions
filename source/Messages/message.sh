# We direct to null so PopClip does not sit around trying to read from stdout.
# Otherwise PopClip blocks and shows the spinner.
./MessageMaker2.app/Contents/MacOS/MessageMaker2 message text "$POPCLIP_TEXT" > /dev/null &
