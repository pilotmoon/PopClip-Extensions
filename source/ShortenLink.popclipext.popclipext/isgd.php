<?php

function force_string($str) {
    return is_string($str)?$str:'';
}

# construct endpoint url
$service=trim(force_string(getenv('POPCLIP_OPTION_DOMAIN')));
$url=trim(force_string(getenv('POPCLIP_TEXT')));
$endpoint="https://" . $service . "/create.php?format=json&url=" . urlencode($url);

# execute request
$ch = curl_init($endpoint);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$response = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

# any good?
if ($code===200) {
	$data=json_decode($response, TRUE);
	$result=trim(force_string($data['shorturl']));
	if(strlen($result) > 0) {
		echo($result);
		exit(0);
	}
}

# bad response
exit(1);