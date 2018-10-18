<?php
$input=getenv('POPCLIP_TEXT');
$variant=getenv('POPCLIP_OPTION_VARIANT');
$output=base64_encode($input);

// modify accorting to specified variant
if (preg_match("/\\(([^\\s]{2})\\)/u", $variant, $matches)) {
	$output=strtr($output, '+/', $matches[1]);
}

echo $output;
