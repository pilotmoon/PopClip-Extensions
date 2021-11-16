<?php
require_once 'Requests-1.7.0/library/Requests.php';
require_once 'constants.inc';
Requests::register_autoloader();

function authorize() {
	$data = json_decode(base64_decode(CLIENT_DATA));
	$query = ['client_id' => $data->client_id, 'redirect_uri' => '', 'response_type' => 'token', 'scope' => 'everything'];
	$url = ENDPOINT_AUTHORIZE . '?' . http_build_query($query);
	`open "$url"`;
}


authorize();