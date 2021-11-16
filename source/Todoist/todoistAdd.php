<?php
require 'common.inc';

$content=getenv('POPCLIP_TEXT');

$api = "https://todoist.com/api/v8/items/add"; 
# docs: https://developer.todoist.com/sync/v8/#add-item
$token = extract_parameter(json_decode(base64_decode(getenv('POPCLIP_OPTION_AUTHSECRET')), TRUE), 'access_token');

// execute request
$ch = curl_init($api);
$post = array('token'=>$token, 'content'=>$content);

curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
#curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
$response = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

echo $code . "\n";
echo $response . "\n";

if ($code==200) {
	exit(0); // ok
}

if ($code>=400&&$code<500) {
	exit(2); // bad auth
}

exit(1); // other errorr

?>