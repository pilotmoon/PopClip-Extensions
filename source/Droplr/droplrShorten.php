<?php
require 'common.inc';
parse_str(base64_decode(POPCLIP_DROPLR_ID));

// authsecret contains the user's email and hashed password
parse_str(base64_decode("cGFzc0hhc2g9MmE0MjlmN2M2ZTlkN2YxNzM2ZTc3NGU0ZDRmOTQyZmNkYTA1OGJiNCZ1c2VyRW1haWw9ZHJvcGxyJTQwcmVxci5uZXQ="));//getenv('POPCLIP_OPTION_AUTHSECRET')));
$url = "http://xkcd.com/";//getenv('POPCLIP_TEXT');

// prepare a call to links.json
$service="/links";
$method = 'POST';
$contentType = 'text/plain';
$time = time()*1000;
$accessKey = base64_encode("$puk:$userEmail");
$sig = signDroplrRequest($prk, $passHash, $method, $service, $contentType, $time);

// execute request
$ch = curl_init(DROPLR_SERVER.$service);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $url);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
	"Authorization: droplr $accessKey:$sig",
	"Date: $time",
	"User-Agent: ".POPCLIP_USER_AGENT,
	"Content-Type: ".$contentType,
	 ));
$response = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($code==201) {
	$json=json_decode($response);
	$link = $json->shortlink;
	if ($json->privacy == "PRIVATE") {
		$link .= "/" . $json->password;
	}
	echo $link;	
	exit(0); // success
}  
else if ($code==401) {
	exit(2); // bad auth
}
else {
	exit(1); // other error
}
?>