<?php
mb_internal_encoding("UTF-8"); 
$text=trim(getenv('POPCLIP_TEXT'));
if (!$text) { // for testing
    $text=$argv[1];
}
$encoding=getenv('POPCLIP_OPTION_ENCODING');
$converted=mb_convert_encoding($text, $encoding);
$hex=array();
foreach (str_split($converted) as $chr) {
    $hex[]=sprintf("%02X", ord($chr));
}
$result=implode(' ', $hex);
echo $result;

