<?php
$input=getenv('POPCLIP_TEXT');
$result = str_replace(".", " ", $input);
echo $result;
?>