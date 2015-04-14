<?php
error_reporting(0);
require 'consumer.inc';
require 'common.inc';
require 'OAuth.php';

// pull in the consumer key and consumer secret
parse_str(base64_decode(CONSUMER_DATA));
$consumer = new OAuthConsumer($ck, $cs);

$callback_inter=getenv('POPCLIP_AUTH_CALLBACK_INTERMEDIATE');
$callback_final=getenv('POPCLIP_AUTH_CALLBACK_FINAL');
if (!$callback_final&&!$callback_inter) {
	//
	// Initial flow
	//

	// build signed request for request token	
	$request = OAuthRequest::from_consumer_and_token($consumer, NULL, 'GET', ENDPOINT_REQUEST, NULL);
	$request->sign_request(new OAuthSignatureMethod_HMAC_SHA1(), $consumer, NULL);
	$url=$request->to_url();

	// get request token
	$response=file_get_contents($url);
	parse_str($response, $token_array);
	if (array_key_exists('oauth_token', $token_array) &&
		array_key_exists('oauth_token_secret', $token_array)) {
		$token=$token_array['oauth_token'];
		$token_secret=$token_array['oauth_token_secret'];

		$web_url=ENDPOINT_AUTHORIZE . "?oauth_token=$token&oauth_callback=" . urlencode(CALLBACK) . "&name=PopClip&expiration=never&scope=read,write";

		`open '$web_url'`;
		echo base64_encode($response);
		exit(4); // indicates callback follows
	}	
}
else
{
	//
	// Callback flow
	//
	parse_str(base64_decode($callback_inter), $inter);
	parse_str($callback_final, $final);

	if (array_key_exists('oauth_token', $inter) &&
		array_key_exists('oauth_token_secret', $inter) &&
		array_key_exists('oauth_verifier', $final)) {

		$request_token_key=$inter['oauth_token'];
		$request_token_secret=$inter['oauth_token_secret'];	
		$verifier=$final['oauth_verifier'];

		$request_token = new OAuthToken($request_token_key,$request_token_secret);
		$request = OAuthRequest::from_consumer_and_token($consumer, $request_token, 'GET', ENDPOINT_ACCESS, NULL);
		$request->set_parameter('oauth_verifier', $verifier, FALSE);
		$request->sign_request(new OAuthSignatureMethod_HMAC_SHA1(), $consumer, $request_token);
		$url=$request->to_url();

		// get request token
		$response=file_get_contents($url);
		parse_str($response, $token_array);
		if (array_key_exists('oauth_token', $token_array) && array_key_exists('oauth_token_secret', $token_array)) {
			echo base64_encode($response);
			exit(0); // cool!
		}
	}
}

exit(2); // failure with settings
