# We direct to null so PopClip does not sit around trying to read from stdout and stderr.
# Otherwise PopClip blocks and shows the spinner.
./MessageMaker2.app/Contents/MacOS/MessageMaker2 com.apple.share.System.add-to-safari-reading-list url "$POPCLIP_TEXT" &> /dev/null &
