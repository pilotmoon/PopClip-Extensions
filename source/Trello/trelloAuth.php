<?php
require 'client.inc';
require 'ext.inc';
require 'OAuth.php';

// $user = getenv('POPCLIP_AUTH_USERNAME');
// $pass = getenv('POPCLIP_AUTH_PASSWORD');


$base_request='https://trello.com/1/OAuthGetRequestToken';
$base_authorise='https://trello.com/1/OAuthAuthorizeToken';
$base_access='https://trello.com/1/OAuthGetAccessToken';
$base_callback='http://reqr.net/callback/popclip?callback_ext_id='.EXTENSION_ID.'&callback_ext_name='.EXTENSION_NAME;

// // generate signed request
parse_str(base64_decode(POPCLIP_CLIENT_INFO));
var_dump(array($ak,$as));
//$consumer = new OAuthConsumer($ak,$as,'popclip://callback');
$consumer = new OAuthConsumer($ak,$as);
$request = OAuthRequest::from_consumer_and_token($consumer, NULL, 'GET', $base_request, NULL);
$request->sign_request(new OAuthSignatureMethod_HMAC_SHA1(), $consumer, NULL);
$url=$request->to_url();
var_dump($url);

// get token
$response=file_get_contents($url);
var_dump($response);
parse_str($response, $token_array);
if (array_key_exists('oauth_token', $token_array) && array_key_exists('oauth_token_secret', $token_array)) {
	$token=$token_array['oauth_token'];
	$token_secret=$token_array['oauth_token_secret'];
}
else {
	exit(2);
}


//$request = OAuthRequest::from_consumer_and_token($consumer, $token_array['oauth_token'], 'GET', $base_authorise, NULL);
$web_url=$base_authorise . "?oauth_token=$token&oauth_callback=" . urlencode($base_callback) . "&name=PopClip&expiration=never&scope=read,write";
var_dump($web_url);

`open '$web_url'`;
echo '1';
exit(1);


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