<?php
require_once 'Requests-1.7.0/library/Requests.php';
Requests::register_autoloader();

function forceString($var) {
	return is_string($var) ? $var : '';
}

function accessToken() {
	return forceString(getenv('POPCLIP_OPTION_ACCESS'));
}

function popclipText() {
	return forceString(getenv('POPCLIP_TEXT'));
}

function pushData($data) {
	$headers = array('Access-Token' => accessToken(), 'Content-Type' => 'application/json');
	var_dump(json_encode($data));
	$request = Requests::post('https://api.pushbullet.com/v2/pushes', $headers, json_encode($data));
}