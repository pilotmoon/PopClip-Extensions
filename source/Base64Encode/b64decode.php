<?php
$input=getenv('POPCLIP_TEXT');

// allow urlsafe version, and allow unpadded
$str=base64_decode(str_pad(strtr($input, '-_', '+/'), strlen($input) % 4, '=', STR_PAD_RIGHT));

// is it a utf8 string?
if (mb_detect_encoding($str, 'UTF-8', true)) {
	echo $str;
}
else {
	echo '<Base64: Binary result not printable>';
}

return 0;
?>