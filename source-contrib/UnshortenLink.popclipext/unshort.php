<?php
$shorturl = getenv('POPCLIP_URLENCODED_TEXT');
$host = "http://api.longurl.org/v2/expand?format=json&url=$shorturl";

# execute request
ini_set('user_agent', 'PopClipUnshorten/1.0');
$ch = curl_init($host);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
$response = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($response && $code==200) {
	$json = json_decode($response, TRUE);
	if ($json) {
		$url = $json['long-url'];
		if ($url) {
			echo $url;
			exit(0); # success, hurrah.		
		}
	}
}  

exit(1); # an error. oh no.

?>