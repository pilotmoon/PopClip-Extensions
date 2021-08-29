<?php
function ifNull($a, $b) {
	return $a?$a:$b;
}
function doConvert($text) {
	date_default_timezone_set('UTC');
	$text=mb_ereg_replace('\s', '', $text); // remove spaces
	return date("Y-m-d H:i:s \U\T\C", $text);	
}
if ($input=getenv('POPCLIP_TEXT')) {
	echo doConvert($input);
}
?>