<?php
$text=rawurlencode(getenv('POPCLIP_TEXT'));

$html=getenv('POPCLIP_HTML');
$html=str_replace(' ', '&nbsp;', $html);
$html=rawurlencode($html);

$url="dropshelf://newShelf?text=$text&html=$html";
`open -g "$url"`;
?>