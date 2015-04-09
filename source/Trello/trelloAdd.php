<?php
//require 'consumer.inc';
require 'OAuth.php';
// $host = "https://www.instapaper.com/api/1/bookmarks/add";

// parse_str(base64_decode(getenv('POPCLIP_OPTION_AUTHSECRET')));
// $url = getenv('POPCLIP_TEXT');

// // generate signed request
// parse_str(base64_decode(POPCLIP_CONSUMER_INFO));
// $consumer = new OAuthConsumer($ck,$cs);
// $token = new OAuthToken($oauth_token,$oauth_token_secret);
// $params = array('url'=>$url);
// $request = OAuthRequest::from_consumer_and_token($consumer, $token, 'POST', $host, $params);
// $request->sign_request(new OAuthSignatureMethod_HMAC_SHA1(), $consumer, $token);

// // execute request
// $ch = curl_init($host);
// curl_setopt($ch, CURLOPT_TIMEOUT, 10);
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
// curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
// curl_setopt($ch, CURLOPT_POST, 1);
// curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array_merge($params, $request->get_parameters())));
// $response = curl_exec($ch);
// $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// if ($code==200) {
// 	exit(0); // success
// }  
// else if ($code==403) {
// 	exit(2); // bad auth
// }
// else {
// 	exit(1); // other error
// }

?>