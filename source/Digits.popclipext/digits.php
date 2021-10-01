<?php
mb_internal_encoding("UTF-8");
$input=getenv('POPCLIP_TEXT');
//$input="yés, no,maybe(i do) TOPSY-TÚRVY æ ø å";
$result=preg_replace('/\D/', '', $input);
echo $result;
?>
