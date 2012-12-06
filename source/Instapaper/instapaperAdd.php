<?php
$user=$_ENV['POPCLIP_OPTION_USER'];
$pass=$_ENV['POPCLIP_OPTION_PASS'];
$url=$_ENV['POPCLIP_TEXT'];

// $user="nick@nickmoore.net";
// $pass="speaker";
// $url="http://example.com/";
//$host="https://www.instapaper.com/api/authenticate";
$host="https://www.instapaper.com/api/add";

$payload=array('url' => $url);

// execur
$ch = curl_init($host);
curl_setopt($ch, CURLOPT_HEADER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_USERPWD, $user . ":" . $pass);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
$return = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($code==201) {
	exit(0); // success
}
else if ($code==403) {
	exit(2); // bad user/pass
}
else {
	exit(1); // other error. unknown.
}
?>