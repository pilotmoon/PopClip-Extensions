<?php
mb_internal_encoding("UTF-8");
$input=getenv('POPCLIP_TEXT');
$service=getenv('POPCLIP_OPTION_SERVICE');

$urlPattern = array(
    'dictionary.com' => 'http://dictionary.reference.com/browse/',
    'dict.cn' => 'http://dict.cn/',
    'dict.youdao.com' => 'http://dict.youdao.com/search?q=',
);

$url = isset($urlPattern[$service]) ? $urlPattern[$service] : $urlPattern['dict'];
$word = urlencode($input);
$url = $url . $word;
echo $url;
exec('open ' . $url);

?>
