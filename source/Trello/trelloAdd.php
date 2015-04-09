<?php
#error_reporting(0);
require 'consumer.inc';
require 'common.inc';
require 'OAuth.php';

$http_code=0;

// tex text to save to trello
$text = getenv('POPCLIP_TEXT');
if (!$text) { // TODO REMOVE!
	$text="SOME TEST TEXT";
}

// pull in the consumer key and consumer secret
parse_str(base64_decode(CONSUMER_DATA));
$consumer=new OAuthConsumer($ck, $cs);

$authsecret=getenv('POPCLIP_OPTION_AUTHSECRET');
if (!$authsecret) { // TODO!!! remove
	$authsecret="b2F1dGhfdG9rZW49YmMxZDhjNDdiMjI1YWE2ZTAxY2ZmOTY5MjRkNTdiMTJjMmE0YjdhNTRmY2JjNjkzZTI5ZTE5MzJlNDQ1ZDdiMyZvYXV0aF90b2tlbl9zZWNyZXQ9ZjljMzBmYTA1OTUzNzg0MTU3MTFlY2Q0MDQyZDc4ZWE=";
}

// get the access token we have been passed
parse_str(base64_decode($authsecret), $access_token_array);

if (array_key_exists('oauth_token', $access_token_array) &&
		array_key_exists('oauth_token_secret', $access_token_array)) {
	$access_token=new OAuthToken($access_token_array['oauth_token'], $access_token_array['oauth_token_secret']);
}
else {
	exit(2);
}

// make an api request
function api($endpoint, $params) {
	global $consumer, $access_token, $http_code;

	$request = OAuthRequest::from_consumer_and_token($consumer, $access_token, 'GET', $endpoint, $params);		
	$request->sign_request(new OAuthSignatureMethod_HMAC_SHA1(), $consumer, $access_token);
	$url=$request->to_url();
	var_dump($url);

	// execute request
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_TIMEOUT, 10);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	//curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
	$response = curl_exec($ch);
	$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

	if ($http_code==200) {
		return $response;
	}  
	else {
		return NULL;
	}
}

$x=api("https://trello.com/1/members/me/boards?fields=name", NULL);
var_dump($x);
var_dump($http_code);

if ($http_code==200) {
	exit(0); // success
}  
else if ($http_code==401) {
	exit(2); // unauthorized
}
else {
	exit(1); // other error
}
