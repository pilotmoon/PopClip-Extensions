<?php
$input=getenv('POPCLIP_TEXT');

// transform urlsafe version to standard version
$str=base64_decode(strtr($input, '-_', '+/'));

// is it a utf8 string?
if (mb_detect_encoding($str, 'UTF-8', true)) {
	echo $str;
}
else {
	echo '<Base64: Binary result not printable>';
}
