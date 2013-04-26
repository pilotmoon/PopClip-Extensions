<?php
function ifNull($a, $b) {
	return $a?$a:$b;
}
function doConvert($text) {
	date_default_timezone_set('UTC');
	return date(DATE_RSS, $text);	
}
if ($input=getenv('POPCLIP_TEXT')) {
	echo doConvert($input);
}
?>