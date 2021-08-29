<?php
define('POPCLIP_DROPLR_ID','cHVrPWYyMDA5NmRkMjNiOWVhN2EyNjFiMWMyOWY4OTE1NmE4YTQwN2FiNGQmcHJrPWI1NWYyOTU0MmEwMjZjNjAwMjEzMWE1NjJiYWUzMTMxMzk1MzBhMTMA');
define('DROPLR_SERVER', 'https://api.droplr.com');
define('POPCLIP_USER_AGENT', 'com.pilotmoon.popclip.extension.droplr/0.1');

function signDroplrRequest($priv, $pass, $method, $uri, $contentType, $date) 
{
	$accessSecret = "$priv:$pass";
	$stringToSign = "$method $uri HTTP/1.1\n$contentType\n$date";
	return base64_encode(hash_hmac('sha1', $stringToSign, $accessSecret, TRUE));
}

?>