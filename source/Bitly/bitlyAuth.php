<?php
require 'consumer.inc';
require 'common.inc';

$api_auth='https://bitly.com/oauth/authorize';
$api_token='https://api-ssl.bitly.com/oauth/access_token';
$redirect='https://pilotmoon.com/popclip_extension_callback?' . http_build_query(array(
	'callback_ext_id'=>'com.pilotmoon.popclip.extension.bitly',
	'callback_ext_name'=>'Bitly',
	'callback_expect'=>'eyJxIjpbImNvZGUiXX0')); // expect 'code'

$final=getenv('POPCLIP_AUTH_CALLBACK_FINAL');
parse_str(base64_decode(POPCLIP_CONSUMER_INFO));

if (!$final) {
	$params = array('client_id'=>$ck, 'redirect_uri'=>$redirect);
	$url = $api_auth . '?' . http_build_query($params);
	echo $url; // popclip needs something
	`open '$url'`;
	exit(4); // indicates callback will follow
}
else {
	parse_str($final, $returned_params);
	$returned_code=extract_parameter($returned_params, 'code');
	if (strlen($returned_code)<1) {
		err("no code parameter");
		exit(2);
	}

	err("authorize call returned code " . $returned_code);

	// execute request
	$ch = curl_init($api_token);
	$post = array('client_id'=>$ck, 'client_secret'=>$cs, 'redirect_uri'=>$redirect, 'code'=>$returned_code);
	
	curl_setopt($ch, CURLOPT_TIMEOUT, 10);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
	$response = curl_exec($ch);
	$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	
	if($code==200) {
		parse_str($response, $output);
		echo $output['access_token'];
		exit(0);
	}
	err("api call fail, code " . $code);
	exit(2);
}

?>