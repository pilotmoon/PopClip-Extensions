# We direct to null so PopClip does not sit around trying to read from stdout.
# Otherwise PopClip blocks and shows the spinner.
./MessageMaker com.apple.share.Facebook.post text "$POPCLIP_TEXT" > /dev/null &
