<?php
$url = getenv('POPCLIP_URLS');
$token = base64_decode(getenv('POPCLIP_OPTION_AUTHSECRET'));

// use link text if we have it, or use url as title
$title = getenv('POPCLIP_URL_TITLES');
if (strlen($title)===0) {
	$title = getenv('POPCLIP_SPECIAL_BROWSER_TITLE');
	if (strlen($title)===0) {
		$title=$url;
	}
}

$params = http_build_query(array('url'=>$url, 'description'=>$title));
$call = "https://api.pinboard.in/v1/posts/add?auth_token=$token&$params";

// execute request
$ch = curl_init($call);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$response = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($code==200) {
	try {
		$sxe = simplexml_load_string($response);
		$code = ((string)($sxe[0]->attributes()->code));
		if ($code==='done') {
			exit(0); // success
		}
		else {
			exit(1);
		}
	} catch (Exception $e) {
		exit(1); // other error
	}
}  
else if ($code==401) {
	exit(2); // bad auth
}
else {
	exit(1); // other error
}

?>