<?php
mb_internal_encoding("UTF-8"); 
// split
$lines=preg_split('/\R/m', getenv('POPCLIP_TEXT'));
$result=array_reverse($lines);
echo implode($result, "\n");
?>