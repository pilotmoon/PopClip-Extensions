<?php
$apiroot = "https://api.todoist.com/API/";

$token = base64_decode(getenv('POPCLIP_OPTION_AUTHSECRET'));
$text = getenv('POPCLIP_TEXT');

$params = array(
		'token'    => $token,
		'content'  => $text);

$apicall = $apiroot . "addItem?" . http_build_query($params);

// execute request
$ch = curl_init($apicall);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

$response = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($code==200) {
	exit(0); // ok
}

if ($code==401) {
	exit(2); // bad auth
}

exit(1); // other errorr

?>