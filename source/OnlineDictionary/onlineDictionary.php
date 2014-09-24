<?php
mb_internal_encoding("UTF-8");
$input=getenv('POPCLIP_TEXT');
$service=getenv('POPCLIP_OPTION_SERVICE');

$urlPattern = array(
	'dict.cc' => 'http://www.dict.cc/?s=',
	'dict.leo.org' => 'http://dict.leo.org/?search=',
	'lingvo-online.ru' => 'http://www.lingvo-online.ru/',
	'merriam-webster.com' => 'http://www.merriam-webster.com/dictionary/',
	'oxfordlearnersdictionaries.com' => 'http://www.oxfordlearnersdictionaries.com/definition/english/',
	'thefreedictionary.com' => 'http://www.thefreedictionary.com/',
	'wordwebonline.com' => 'http://www.wordwebonline.com/search.pl?w=',
    'dict.cn' => 'http://dict.cn/',
    'dict.youdao.com' => 'http://dict.youdao.com/search?q=',
    'dictionary.com' => 'http://dictionary.reference.com/browse/',
    'iciba.com' => 'http://www.iciba.com/',
    'tureng.com' => 'http://tureng.com/search/',
);

$url = isset($urlPattern[$service]) ? $urlPattern[$service] : $urlPattern['dict'];
$word = urlencode($input);
$url = $url . $word;
exec('open ' . $url);

?>
