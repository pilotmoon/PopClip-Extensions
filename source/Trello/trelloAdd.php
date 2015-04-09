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
$textparts=explode($text,"\n", 2);
$firstline=$textparts[0];
$body=$textparts[1];
$source_url =getenv('POPCLIP_BROWSER_URL');

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
function api($endpoint, $params=NULL, $method='GET') {
	global $consumer, $access_token, $http_code;

	$request = OAuthRequest::from_consumer_and_token($consumer, $access_token, 'GET', $endpoint, $params);		
	$request->sign_request(new OAuthSignatureMethod_HMAC_SHA1(), $consumer, $access_token);
	$url=$request->to_url();
	var_dump($url);

	// execute request
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_TIMEOUT, 10);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
	if ($method==='POST') {
		curl_setopt($ch, CURLOPT_POST, 1);
	}
	else if ($method==='PUT') {
		curl_setopt($ch, CURLOPT_PUT, 1);
	}
	$response = curl_exec($ch);
	$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

	if ($http_code==200) {
		return $response;
	}  
	else {
		return NULL;
	}
}

$lists=json_decode(api("https://trello.com/1/boards/TQiYDk1V/lists", array()), TRUE);
var_dump($lists);
var_dump($http_code);

if(count($lists)>0) {
	$target_list=$lists[0]['id'];
	var_dump($target_list);


	$result=json_decode(api("https://trello.com/1/cards", array('idList'=>$target_list, 'urlSource'=>$source_url, 'name'=>$text, 'pos'=>'top'), 'POST'), TRUE);
	var_dump($result);
	exit(0); // success
}

if ($http_code==401) {
	exit(2); // unauthorized
}
else {
	exit(1); // other error
}
