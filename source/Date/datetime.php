<?php
mb_internal_encoding("UTF-8");
$input=strtolower(getenv('POPCLIP_TEXT'));
// default format
$format = 'Y-m-d';

function getOpts($str) {
    $name = 'POPCLIP_OPTION_' . strtoupper($str);
    $value = getenv($name);
    return substr($value, 0, strpos($value, '('));
}

$dateType = getOpts('date');
$timeType = getOpts('time');

file_put_contents('/tmp/popcliplog', $input . '--st  ', FILE_APPEND);
switch ($input) {
    case 'dt':
    case 'datetime':
        $format = $dateType . ' ' . $timeType;
        break;
    case 'time':
        $format = $timeType;
        break;
    case 'date':
        $format = $dateType;
        break;
}
file_put_contents('/tmp/popcliplog', $format, FILE_APPEND);

echo @date($format);
?>
