# We direct to null so PopClip does not sit around trying to read from stdout and stderr.
# Otherwise PopClip blocks and shows the spinner.
./MessageMaker2.app/Contents/MacOS/MessageMaker2 com.apple.share.SinaWeibo.post text "$POPCLIP_TEXT" &> /dev/null &
