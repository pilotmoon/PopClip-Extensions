<?php
$access = base64_decode(getenv('POPCLIP_OPTION_AUTHSECRET'));
$url = rawurlencode(getenv('POPCLIP_TEXT'));

// execute request
$ch = curl_init("https://api-ssl.bitly.com/v3/shorten?format=json&access_token=$access&longUrl=$url");
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

$response = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

$json = json_decode($response);
$status = $json->status_code;
$result = $json->data->url;

if ($code==200&&$status==200) {
	echo $result;
	exit(0); // success
}  
else if ($code==200&&$status=500) {
	exit(2); // bad auth
}
else {
	exit(1); // other error
}

?>