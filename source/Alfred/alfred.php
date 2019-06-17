<?php

// select target app
$alfred2bid='com.runningwithcrayons.Alfred-2';
$alfred3bid='com.runningwithcrayons.Alfred-3';
$alfred4bid='com.runningwithcrayons.Alfred';
$bid=trim(force_string(`./SelectApp ${alfred4bid} ${alfred3bid} ${alfred2bid}`));

if(strlen($bid)>0) {
	// get the popclip text
	$popclip_text=applescript_safe(trim(force_string(getenv('POPCLIP_TEXT'))));	
	$applescript=escapeshellarg("tell application id \"$bid\" to search \"$popclip_text\"");
	$result=`echo $applescript | osascript -`;
}

function force_string($str) {
	return is_string($str)?$str:'';
}

// escape backslashes and double quotes
function applescript_safe($string) {
	$string=str_replace("\\", "\\\\", $string);
	$string=str_replace("\"", "\\\"", $string);
	return $string;
}

?>