<?php
$input=getenv('POPCLIP_TEXT');
$output='';

function mb_str_split($string) { 
    # Split at all position not after the start: ^ 
    # and not before the end: $ 
    return preg_split('/(?<!^)(?!$)/u', $string); 
} 

$chars=mb_str_split($input);

foreach ($chars as $c) {
	$val=ord($c);
	if ($val>=32&&$val<=126) {
		$output.=$c;
	}
}

echo $output;

?>