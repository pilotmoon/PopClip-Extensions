<?php
define(POPCLIP_DROPLR_ID,'cHVrPWNiYjU2NDFkNzc3YmZlYWMyZGM4ZmNlMGIxZDkwOWUzZGI4Mzc5ODUmcHJrPWQ5MmFlMGRhMWQ1Zjc3ZTI2NTNmZGY3ZjYyMDQ2MDg3NWI1ZDBkMmI=');
define(DROPLR_SERVER, 'http://sandbox.droplr.com:8069');
define(POPCLIP_USER_AGENT, 'com.pilotmoon.popclip.extension.droplr/0.1');

function signDroplrRequest($priv, $pass, $method, $uri, $contentType, $date) 
{
	$accessSecret = "$priv:$pass";
	$stringToSign = "$method $uri HTTP/1.1\n$contentType\n$date";
	return base64_encode(hash_hmac('sha1', $stringToSign, $accessSecret, TRUE));
}

?>