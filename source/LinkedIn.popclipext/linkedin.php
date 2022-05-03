<?php
$browsers=array("com.apple.Safari",
	"com.google.Chrome",
	"com.google.Chrome.canary",
	"org.mozilla.firefox",
	"org.mozilla.aurora",
	"com.operasoftware.Opera",
	"com.omnigroup.OmniWeb5",
	"org.mozilla.camino");
$app=getenv('POPCLIP_BUNDLE_IDENTIFIER');
if (!in_array($app, $browsers)) {
	$app=NULL;
}

$input=getenv('POPCLIP_TEXT');
$input=$input?$input:"John A Smith";
if (1===preg_match("/^\\s*([^\\s]+(?:\\s[^\\s]+){0,3})(?:\\s([^\\s]+))\\s*$/us", $input, $matches)) {
	$first=$matches[1];
	$last=$matches[2];
	if ($app) {
		`open -b $app "https://www.linkedin.com/pub/dir/?first=$first+&last=$last&search=Go"`;
	}
	else {
		`open "https://www.linkedin.com/pub/dir/?first=$first+&last=$last&search=Go"`;
	}
}
?>