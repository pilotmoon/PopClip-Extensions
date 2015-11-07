<?php
# Set encoding in LANG variable to UTF-8 otherwise pbcopy & pbpaste act up.
$current=trim(`export LANG=en_US.UTF-8; pbpaste`, "\r\n");
$new=trim(getenv('POPCLIP_TEXT'), "\r\n");

$opt=intval(getenv('POPCLIP_MODIFIER_FLAGS'))&524288;
if($opt) {
	$result=escapeshellarg($new."\n".$current);
}
else {
	$result=escapeshellarg($current."\n".$new);
}

# Call /bin/echo not just echo, otherwise -n parameter doesn't work.
`export LANG=en_US.UTF-8; /bin/echo -n $result | pbcopy`;
?>
