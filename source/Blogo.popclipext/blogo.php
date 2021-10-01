<?php
		
function force_string($str) {
	return trim(is_string($str)?$str:'');
}

// get the required fields
$popclip_text=force_string(getenv('POPCLIP_TEXT'));
$popclip_browser_url=force_string(getenv('POPCLIP_BROWSER_URL'));
$popclip_browser_title=force_string(getenv('POPCLIP_BROWSER_TITLE'));
$popclip_app_name=force_string(getenv('POPCLIP_APP_NAME'));						

$params=['quote'=>$popclip_text,
		 'site_name'=>empty($popclip_browser_title)?$popclip_app_name:$popclip_browser_title];

if (!empty($popclip_browser_url)) {
	$params['src']=$popclip_browser_url;
}

$query=http_build_query($params, null, '&', PHP_QUERY_RFC3986);
$url='blogo://popclip?'.$query;
$escapedurl=escapeshellarg($url);
echo 'escaped url '.$escapedurl."\n";
$result=`open $escapedurl`;

?>