<?php
require 'consumer.inc';
require 'OAuth.php';
$host = "https://www.readability.com/api/rest/v1/oauth/access_token/";

$user = getenv('POPCLIP_AUTH_USERNAME');
$pass = getenv('POPCLIP_AUTH_PASSWORD');

// generate signed request
parse_str(base64_decode(POPCLIP_READABILITY_CONSUMER_INFO));
$consumer = new OAuthConsumer($ck,$cs);
$params = array('x_auth_username'=>$user, 'x_auth_password'=>$pass, 'x_auth_mode'=>'client_auth');
$request = OAuthRequest::from_consumer_and_token($consumer, NULL, 'POST', $host, $params);
$request->sign_request(new OAuthSignatureMethod_HMAC_SHA1(), $consumer, NULL);

// execute request
$ch = curl_init($host);
//curl_setopt($ch, CURLOPT_HEADER, 1);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array_merge($params, $request->get_parameters())));
$response = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($code==200) {
	echo base64_encode($response);
	exit(0); // success
}  
else if ($code==403) {
	exit(2); // bad auth
}
else {
	exit(1); // other error
}

?>