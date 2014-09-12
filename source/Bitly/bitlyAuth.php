<?php
$user = rawurlencode(getenv('POPCLIP_AUTH_USERNAME'));
$pass = rawurlencode(getenv('POPCLIP_AUTH_PASSWORD'));

// execute request
$ch = curl_init("https://$user:$pass@api-ssl.bitly.com/oauth/access_token");
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, array());

$response = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($code==200 && strlen($response) > 0) {
	$data = json_decode($response);
	if ($data===NULL) {
		echo base64_encode($response);
		exit(0);
	}
}  

exit(2);


?>