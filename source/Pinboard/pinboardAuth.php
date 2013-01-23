<?php
$user = getenv('POPCLIP_AUTH_USERNAME');
$pass = getenv('POPCLIP_AUTH_PASSWORD');

// execute request
$ch = curl_init("https://$user:$pass@api.pinboard.in/v1/user/api_token");
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$response = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($code==200) {
	try {
		$sxe = simplexml_load_string($response);
		$token = (string)($sxe[0]);	
		echo base64_encode("$user:$token");
		exit(0); // success
	} catch (Exception $e) {
		exit(1); // other error
	}
}  
else if ($code==403) {
	exit(2); // bad auth
}
else {
	exit(1); // other error
}

?>