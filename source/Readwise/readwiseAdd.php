<?php

$source_url = getenv('POPCLIP_BROWSER_URL');
$text = getenv('POPCLIP_TEXT');
$title = getenv('POPCLIP_BROWSER_TITLE');
$token = getenv('POPCLIP_OPTION_ACCESSTOKEN');

$payload = new stdClass();
$payload->text = $text;
$payload->source_url = $source_url;
$payload->title = $title;

$highlights = array($payload);

$data = "{\"highlights\": " . json_encode($highlights) . "}";
$call = "https://readwise.io/api/v2/highlights/";

// execute request
$ch = curl_init($call);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HEADER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER,
    array(
        'Content-Type:application/json',
        'Authorization: Token ' . $token 
    )
);

$response = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($code==200) {
  exit(0); // success
}  
else if ($code==401) {
	exit(2); // bad auth
}
else {
	exit(1); // other error
}

?>
