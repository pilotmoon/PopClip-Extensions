<?php
mb_internal_encoding("UTF-8");
$input=getenv('POPCLIP_TEXT');
$service=getenv('POPCLIP_OPTION_SERVICE');

$urlPattern = array(
	'thesaurus.com' => 'http://thesaurus.com/browse/',
	'collinsdictionary.com' => 'http://www.collinsdictionary.com/dictionary/english-thesaurus/'
);

$url = isset($urlPattern[$service]) ? $urlPattern[$service] : $urlPattern['dict'];
$word = urlencode($input);
$url = $url . $word;
exec('open ' . $url);

?>
