<?php
$input=getenv('POPCLIP_TEXT');
$result = str_replace(",", "\t", $input);
echo $result;
?>