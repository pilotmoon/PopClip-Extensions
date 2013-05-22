<?php
$input=getenv('POPCLIP_TEXT');
$input=$input?$input:"John A Smith";
if (1===preg_match("/^\\s*([^\\s]+(?:\\s[^\\s]+){0,3})(?:\\s([^\\s]+))\\s*$/us", $input, $matches)) {
	$first=$matches[1];
	$last=$matches[2];
	`open "http://www.linkedin.com/pub/dir/?first=$first+&last=$last&search=Go"`;
}
?>