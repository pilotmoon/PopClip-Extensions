<?php
# Set encoding in LANG variable to UTF-8 otherwise pbcopy & pbpaste act up.
$current=`export LANG=en_US.UTF-8; pbpaste`;
$tocopy=$_ENV['POPCLIP_TEXT'];
$new=escapeshellarg(trim($current, "\r\n")."\n".trim($tocopy, "\r\n"));
# Call /bin/echo not just echo, otherwise -n parameter doesn't work.
`export LANG=en_US.UTF-8; /bin/echo -n $new | pbcopy`;
?>
