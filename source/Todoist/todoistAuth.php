<?php
require 'common.inc';
require 'consumer.inc';
$api_auth = 'https://todoist.com/oauth/authorize';
$api_token = 'https://todoist.com/oauth/access_token';
$final=getenv('POPCLIP_AUTH_CALLBACK_FINAL');
parse_str(base64_decode(POPCLIP_CONSUMER_INFO));

if (!$final) {
	$params = array('client_id'=>$ck, 'scope'=>'task:add', 'state'=>$st);
	$url = $api_auth . '?' . http_build_query($params);
	`open '$url'`;
	echo 'ok'; // have to return something or PopClip won't be happy
	exit(4); // indicates callback will follow
}
else {
	parse_str($final, $returned_params);
	$returned_code=extract_parameter($returned_params, 'code');
	$returned_state=extract_parameter($returned_params, 'state');
	if (strlen($returned_code)<1) {
		exit(2);
	}
	if (strcmp($st, $returned_state)!==0) {
		exit(2);
	};

	// execute request
	$ch = curl_init($api_token);
	$post = array('client_id'=>$ck, 'client_secret'=>$cs, 'code'=>$returned_code);

	curl_setopt($ch, CURLOPT_TIMEOUT, 10);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	#curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
	$response = curl_exec($ch);
	$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

	if($code==200) {
		echo base64_encode($response);
		exit(0);
	}
	
	exit(2);
}
