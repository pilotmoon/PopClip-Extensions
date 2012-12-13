<?php
$current=`pbpaste`;
$tocopy=$_ENV['POPCLIP_TEXT'];
$new=trim($current, "\r\n")."\n".trim($tocopy, "\r\n");
`echo "$new" | pbcopy`;
?>
