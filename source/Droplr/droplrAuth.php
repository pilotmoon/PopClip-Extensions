<?php
require 'common.inc';
parse_str(base64_decode(POPCLIP_DROPLR_ID));

// get user's email and hashed password
$userEmail = getenv('POPCLIP_AUTH_USERNAME');
$passHash = sha1(getenv('POPCLIP_AUTH_PASSWORD'));

// prepare a call to /account.json, to verify credentials
$service="/account";
$method = 'GET';
$contentType = '';
$time = time()*1000;
$accessKey = base64_encode("$puk:$userEmail");
$sig = signDroplrRequest($prk, $passHash, $method, $service, $contentType, $time);

// execute request
$ch = curl_init(DROPLR_SERVER.$service);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
	"Authorization: droplr $accessKey:$sig",
	"Date: $time",
	"User-Agent: ".POPCLIP_USER_AGENT
	));
$response = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($code==200) {
	// logged in ok. save email and hashed password to keychain.
	echo base64_encode(http_build_query(array('passHash' => $passHash, 'userEmail' => $userEmail)));
	exit(0); // success
}  
else if ($code==401) {
	exit(2); // bad auth
}
else {
	exit(1); // other error
}
?>