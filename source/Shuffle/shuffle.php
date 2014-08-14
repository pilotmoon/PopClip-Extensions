<?php
$lines=preg_split('/\R/m', getenv('POPCLIP_TEXT'));
shuffle($lines);
echo implode($lines, "\n");
?>