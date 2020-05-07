<?php
$access = "2f6e0da60e8fb5c2905c7f3fc88d6e31e0adbc65";//base64_decode(getenv('POPCLIP_OPTION_AUTHSECRET'));
$url = "https://xkcd.com/";//etenv('POPCLIP_TEXT');

// execute request
$ch = curl_init("https://api-ssl.bitly.com/v4/shorten");
$header = array("Authorization: Bearer " . $access,
	"Content-Type: application/json");
$postjson = json_encode(["long_url" => $url]);

curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postjson);
$response = curl_exec($ch);

$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($code==200) {
	$json = json_decode($response);
	$result = $json->link;
	echo $result;
	exit(0); // success
}  
else if ($code==403) {
	exit(2); // bad auth
}
else {
	exit(1); // other error
}

?>