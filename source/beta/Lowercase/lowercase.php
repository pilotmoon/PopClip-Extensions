<?php
mb_internal_encoding("UTF-8");
$input=getenv('POPCLIP_TEXT');
//$input="yés, no,maybe(i do) TOPSY-TÚRVY æ ø å";

$result=mb_strtolower($input);

echo $result;

?>