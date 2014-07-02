<?php
mb_internal_encoding("UTF-8");
$input=getenv('POPCLIP_TEXT');
// $input="yés, no,maybe(i do) TOPSY-TÚRVY";

function mb_ucfirst($string)
{
    $strlen = mb_strlen($string);
    $firstChar = mb_substr($string, 0, 1);
    $then = mb_substr($string, 1, $strlen - 1);
    return mb_strtoupper($firstChar) . $then;
}

$result = preg_replace_callback('/[^\s,.;:!\-–—\(\)\[\]\{\}]+/u', create_function(
            // single quotes are essential here,
            // or alternative escape all $ as \$
            '$matches',
            'return mb_ucfirst(mb_strtolower($matches[0]));'
        ), $input);

echo $result;

?>