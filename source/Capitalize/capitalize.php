<?php
$input=getenv('POPCLIP_TEXT');
//$input="yés, no,maybe(i do) TOPSY-TÚRVY";

$result = preg_replace_callback('/[^\s,.;:!\-–—\(\)\[\]\{\}]+/u', create_function(
            // single quotes are essential here,
            // or alternative escape all $ as \$
            '$matches',
            'return ucfirst(strtolower($matches[0]));'
        ), $input);

echo $result;

?>