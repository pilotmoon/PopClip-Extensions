<?php
$access = base64_decode(getenv('POPCLIP_OPTION_AUTHSECRET'));
$url = rawurlencode(getenv('POPCLIP_TEXT'));

// execute request
$ch = curl_init("https://api-ssl.bitly.com/v3/shorten?format=json&access_token=$access&longUrl=$url");
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

$response = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($code==200) {
	echo json_decode($response)->data->url;
	exit(0); // success
}  
else if ($code==500) {
	exit(2); // bad auth
}
else {
	exit(1); // other error
}

?>