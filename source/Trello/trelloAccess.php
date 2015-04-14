<?php
require 'client.inc';
require 'OAuth.php';

// $user = getenv('POPCLIP_AUTH_USERNAME');
// $pass = getenv('POPCLIP_AUTH_PASSWORD');


$base_request='https://trello.com/1/OAuthGetRequestToken';
$base_authorise='https://trello.com/1/OAuthAuthorizeToken';
$base_access='https://trello.com/1/OAuthGetAccessToken';

$yyyy='oauth_token=a2fc622c428b11238996221eb874d0dc&oauth_token_secret=c77cd3beae2f89667929a7a1e64e79dd';
$xxxx='oauth_token=a2fc622c428b11238996221eb874d0dc&oauth_verifier=11c901f428b49db744b9004027c10ccb';

parse_str($yyyy);
parse_str($xxxx);

// // generate signed request
parse_str(base64_decode(POPCLIP_CLIENT_INFO));
var_dump(array($ak,$as));
//$consumer = new OAuthConsumer($ak,$as,'popclip://callback');
$consumer = new OAuthConsumer($ak,$as);
$token = new OAuthToken($oauth_token,$oauth_token_secret);
$request = OAuthRequest::from_consumer_and_token($consumer, $token, 'GET', $base_access, NULL);
$request->set_parameter('oauth_verifier', $oauth_verifier, FALSE);
$request->sign_request(new OAuthSignatureMethod_HMAC_SHA1(), $consumer, $token);
$url=$request->to_url();
var_dump($url);

// get token
//$response=file_get_contents($url);
//var_dump($response);
//parse_str($response, $token_array);



// if (array_key_exists('oauth_token', $token_array) && array_key_exists('oauth_token_secret', $token_array)) {
// 	$token=$token_array['oauth_token'];
// 	$token_secret=$token_array['oauth_token_secret'];
// }
// else {
// 	exit(2);
// }



//////$authurl='https://trello.com/1/authorize?key='.$ak.'&name=PopClip Trello Extension&expiration=never&response_type=token&scope=read,write';

// $params = array('x_auth_username'=>$user, 'x_auth_password'=>$pass, 'x_auth_mode'=>'client_auth');
// $request = OAuthRequest::from_consumer_and_token($consumer, NULL, 'POST', $host, $params);
// $request->sign_request(new OAuthSignatureMethod_HMAC_SHA1(), $consumer, NULL);

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
// 	echo base64_encode($response);
// 	exit(0); // success
// }  
// else if ($code==403) {
// 	exit(2); // bad auth
// }
// else {
// 	exit(1); // other error
// }






?>