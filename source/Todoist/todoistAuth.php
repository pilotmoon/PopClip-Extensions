<?php
$apiroot = "https://api.todoist.com/API/";

$user = getenv('POPCLIP_AUTH_USERNAME');
$pass = getenv('POPCLIP_AUTH_PASSWORD');

$params = array(
		'email'    => $user,
		'password' => $pass);

$apicall = $apiroot . "login?" . http_build_query($params);

// execute request
$ch = curl_init($apicall);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

$response = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$response = json_decode($response, TRUE);

if ($response==='LOGIN_ERROR') {		
	exit(2); // bad auth
}

if (array_key_exists('token', $response)) {
	echo base64_encode($response['token']);
	exit(0); // all good
}

exit(1); // other error

?>