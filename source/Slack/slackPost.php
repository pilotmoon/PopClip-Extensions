<?php

// escapings as required by slack api
function slack_escape($str) {
	$str = str_replace('&', '&amp;', $str);
	$str = str_replace('<', '&lt;', $str);
	$str = str_replace('>', '&gt;', $str);
	return $str;
}

// the clipped text & metadata
$url=getenv('POPCLIP_OPTION_WEBHOOKURL');
$text = getenv('POPCLIP_TEXT');
$source_url = getenv('POPCLIP_BROWSER_URL');
$source_title = getenv('POPCLIP_BROWSER_TITLE');
$source_app = getenv('POPCLIP_APP_NAME');

// test data
// $url = '';
// $text="Hello & <yes> <example.com>\nHow are you";
// $source_url = "http://example.com/?query=123&more=th<<lg>";
// $source_title = "Some Title";
// $source_app = "Some App";

// escape and process
$text= slack_escape($text);
$source_url = slack_escape($source_url);
$source_title = slack_escape($source_title);
$source_app = slack_escape($source_app);

if ($source_url) {
	// generate source link in slack markup format
	if ($source_title) {
		$source = '<'.$source_url.'|'.$source_title.'>';
	}
	else {
		$source = '<'.$source_url.'>';
	}
}
else if ($source_app) {
	// no url, so just use the app name
	$source = $source_app;
}

$pre = '';
if (strlen($source)>0) {
	$pre .= 'Clip from '.$source;
}

// build request
$header = ['Content-Type: application/json'];
$body = json_encode([
	'text' => $pre,
	'username' => 'PopClip',
	'icon_url' => 'https://d20vhy8jiniubf.cloudfront.net/assets/popclip-icon-256.png',
	'unfurl_links' => FALSE,
	'attachments' => [[
		'text' => $text,
	]]]);

// execute request
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
curl_setopt($ch, CURLOPT_HEADER, TRUE);
//curl_setopt($ch, CURLOPT_VERBOSE, TRUE);
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);

//var_dump($response);
$response = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($code==200) {
	exit(0); // success
}  
else {
	exit(2); // auth error
}